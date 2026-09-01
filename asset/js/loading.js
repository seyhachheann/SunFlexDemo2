// ============== Loading ===========
window.addEventListener('load', function () {
  var loader = document.getElementById('sfxLoader');
  if (!loader) return;
  loader.classList.add('sfx-loader-hidden');
  setTimeout(function () { loader.remove(); }, 500);
});