// partner Filter
    document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.partner-filter-btn');
    var cards = document.querySelectorAll('.partner-card');

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');

        cards.forEach(function (card) {
            var match = filter === 'all' || card.getAttribute('data-category') === filter;
            card.classList.toggle('is-hidden', !match);
        });
        });
    });
    });
