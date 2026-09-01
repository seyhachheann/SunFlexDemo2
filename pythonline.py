"""
SunFlex site build script
--------------------------
Minifies the whole site (all .html and .css files, and .js files with light,
conservative minification) into a dist/ folder, copying everything else
(images, fonts, vendor libraries) over untouched.

"""

import os
import re
import shutil

# ── Config — adjust if your folder names/layout differ ─────────────────────
# If build.py sits INSIDE SunFlex-Webside (next to index.html and asset/),
# like this — use ".":
SRC_DIR = "."
# If build.py sits ONE LEVEL ABOVE SunFlex-Webside instead (next to the
# SunFlex-Webside folder, not inside it), use:
# SRC_DIR = "SunFlex-Webside"
DIST_DIR = "dist"
# ─────────────────────────────────────────────────────────────────────────


def minify_html(html: str) -> str:
    """Collapse HTML whitespace/comments. Leaves <script>/<style> content
    mostly intact (only trims blank lines) since fully joining JS onto one
    line can break code relying on automatic semicolon insertion."""
    blocks = []

    def stash(m):
        blocks.append(m.group(0))
        return f"@@BLOCK{len(blocks)-1}@@"

    html = re.sub(r'<script\b.*?</script>', stash, html, flags=re.DOTALL | re.IGNORECASE)
    html = re.sub(r'<style\b.*?</style>', stash, html, flags=re.DOTALL | re.IGNORECASE)

    html = re.sub(r'<!--(?!\[if).*?-->', '', html, flags=re.DOTALL)
    html = re.sub(r'>\s+<', '><', html)
    html = re.sub(r'\s+', ' ', html)
    html = html.strip()

    def restore(m):
        block = blocks[int(m.group(1))]
        return re.sub(r'\n\s*\n+', '\n', block)

    html = re.sub(r'@@BLOCK(\d+)@@', restore, html)
    return html


def minify_css(css: str) -> str:
    """Safe, standard CSS minification: strip comments, collapse whitespace,
    remove unnecessary spaces around punctuation. CSS has no ASI concerns
    like JS does, so this can be fully joined with no risk."""
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)   # comments
    css = re.sub(r'\s+', ' ', css)                          # collapse whitespace
    css = re.sub(r'\s*([{}:;,])\s*', r'\1', css)             # trim around punctuation
    css = re.sub(r';}', '}', css)                            # drop trailing ; before }
    return css.strip()


def minify_js(js: str) -> str:
    """Conservative JS minification: strips /* */ block comments and
    whole-line // comments, collapses blank lines, trims trailing
    whitespace. Does NOT join lines or touch inline // (too risky without
    a real JS parser — could break strings, regex literals, or URLs)."""
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
    lines = js.split('\n')
    cleaned = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('//'):
            continue  # drop whole-line comments only
        cleaned.append(line.rstrip())
    js = '\n'.join(cleaned)
    js = re.sub(r'\n\s*\n+', '\n', js)  # collapse blank lines
    return js.strip()


def build():
    if not os.path.isdir(SRC_DIR):
        print(f"ERROR: source folder '{SRC_DIR}' not found. "
              f"Edit SRC_DIR at the top of this script if your folder is named differently.")
        return

    if os.path.isdir(DIST_DIR):
        shutil.rmtree(DIST_DIR)  # dist/ is fully regenerated each run

    stats = {"html": 0, "css": 0, "js": 0, "copied": 0}

    dist_abs = os.path.abspath(DIST_DIR)

    for root, dirs, files in os.walk(SRC_DIR):
        # If dist/ lives inside SRC_DIR (e.g. SRC_DIR="."), don't walk into
        # it — otherwise a second run would try to "minify" its own output.
        dirs[:] = [d for d in dirs if os.path.abspath(os.path.join(root, d)) != dist_abs]

        rel_root = os.path.relpath(root, SRC_DIR)
        dist_root = os.path.join(DIST_DIR, rel_root) if rel_root != "." else DIST_DIR
        os.makedirs(dist_root, exist_ok=True)

        for filename in files:
            src_path = os.path.join(root, filename)
            dist_path = os.path.join(dist_root, filename)
            ext = os.path.splitext(filename)[1].lower()

            try:
                if ext == ".html":
                    with open(src_path, encoding="utf-8") as f:
                        content = f.read()
                    with open(dist_path, "w", encoding="utf-8") as f:
                        f.write(minify_html(content))
                    stats["html"] += 1

                elif ext == ".css":
                    with open(src_path, encoding="utf-8") as f:
                        content = f.read()
                    with open(dist_path, "w", encoding="utf-8") as f:
                        f.write(minify_css(content))
                    stats["css"] += 1

                elif ext == ".js":
                    with open(src_path, encoding="utf-8") as f:
                        content = f.read()
                    with open(dist_path, "w", encoding="utf-8") as f:
                        f.write(minify_js(content))
                    stats["js"] += 1

                else:
                    # images, fonts, vendor libraries, etc — copy as-is
                    shutil.copy2(src_path, dist_path)
                    stats["copied"] += 1

            except UnicodeDecodeError:
                # binary file that slipped past the extension check — just copy it
                shutil.copy2(src_path, dist_path)
                stats["copied"] += 1

    print("Build complete.")
    print(f"  HTML files minified: {stats['html']}")
    print(f"  CSS files minified:  {stats['css']}")
    print(f"  JS files minified:   {stats['js']}")
    print(f"  Other files copied:  {stats['copied']}")
    print(f"\nUpload the contents of '{DIST_DIR}/' to your server.")


if __name__ == "__main__":
    build()
