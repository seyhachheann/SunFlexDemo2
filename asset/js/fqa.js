
// ========== FQA ===============
document.addEventListener('DOMContentLoaded', function () {
  var fab = document.getElementById('sfFaqFab');
  var overlay = document.getElementById('sfFaqOverlay');
  var closeBtn = document.getElementById('sfFaqClose');

  function openFaq(){ overlay.classList.add('sf-faq-open'); }
  function closeFaq(){ overlay.classList.remove('sf-faq-open'); }

  fab.addEventListener('click', openFaq);
  closeBtn.addEventListener('click', closeFaq);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeFaq();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeFaq();
  });

  document.querySelectorAll('.sf-faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.sf-faq-item');
      var answer = item.querySelector('.sf-faq-a');
      var isActive = item.classList.contains('sf-faq-active');

      document.querySelectorAll('.sf-faq-item').forEach(function (i) {
        i.classList.remove('sf-faq-active');
        i.querySelector('.sf-faq-a').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('sf-faq-active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
