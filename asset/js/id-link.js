// ==== Id Link Like Private Cloud , Big Data Under Banner Home ========
document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hash) return;

  var targetId = window.location.hash.substring(1); // e.g. "privatecloudhome11"
  var target = document.getElementById(targetId);
  if (!target) return;

  var panel = target.closest('.nda-panel');
  if (!panel) return;

  var panelName = panel.getAttribute('data-panel'); // e.g. "nms"

  var tabBtn = document.querySelector('.nda-tab[data-tab="' + panelName + '"]');
  if (tabBtn) tabBtn.click();

  setTimeout(function () {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
});