/* Boxing Random - Main JavaScript */

(function () {
    'use strict';

    // --- Game Lazy Loading ---
    var playBtn = document.getElementById('play-btn');
    var overlay = document.getElementById('game-overlay');
    var gameContainer = document.getElementById('game-container');
    var defaultGameSrc = 'https://games.crazygames.com/en_US/boxing-random/index.html?skipPrerollFirstSession=true&czyExpSkipPlayNowOnly_CZY_18027_2=disabled&v=1.353';
    var iframeAllow = 'autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope; display-capture';

    function getGameFrame() {
        return document.getElementById('game-frame');
    }

    function loadGame() {
        var frame = getGameFrame();
        if (!frame) return;
        var src = frame.getAttribute('data-src') || defaultGameSrc;
        if (src && !frame.src) {
            frame.src = src;
        }
        if (overlay) overlay.classList.add('hidden');
    }

    if (playBtn && overlay) {
        playBtn.addEventListener('click', loadGame);
        overlay.addEventListener('click', loadGame);
        playBtn.addEventListener('touchend', function (e) {
            e.preventDefault();
            loadGame();
        });
    }

    // --- Fullscreen ---
    var fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function () {
            var el = gameContainer || getGameFrame();
            if (!el) return;
            if (el.requestFullscreen) {
                el.requestFullscreen();
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            }
        });
    }

    // --- Mobile Menu Toggle ---
    var menuBtn = document.querySelector('.mobile-menu-btn');
    var navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Game Switching ---
    var backBtn = document.getElementById('back-to-boxing');
    var gameTitle = document.getElementById('game-title');
    var gameCards = document.querySelectorAll('.game-card[data-game-src]');

    function replaceIframe(src) {
        var oldFrame = getGameFrame();
        if (oldFrame) oldFrame.remove();

        var newFrame = document.createElement('iframe');
        newFrame.id = 'game-frame';
        newFrame.src = src;
        newFrame.title = 'Game - Play Free Online';
        newFrame.setAttribute('allow', iframeAllow);
        newFrame.allowFullscreen = true;
        newFrame.setAttribute('playsinline', '');
        newFrame.scrolling = 'no';
        gameContainer.appendChild(newFrame);
    }

    function switchGame(src, title) {
        if (!gameContainer) return;
        replaceIframe(src);
        if (overlay) overlay.classList.add('hidden');
        if (gameTitle) gameTitle.textContent = title + ' - Play Free Online';
        if (backBtn) backBtn.classList.remove('hidden');
        gameCards.forEach(function (c) {
            c.classList.toggle('active', c.getAttribute('data-game-title') === title);
        });
    }

    gameCards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            var src = this.getAttribute('data-game-src');
            var title = this.getAttribute('data-game-title');
            if (src) {
                switchGame(src, title);
                var gameSection = document.getElementById('game');
                if (gameSection) {
                    var headerHeight = document.querySelector('.site-header').offsetHeight || 60;
                    var top = gameSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            }
        });
    });

    if (backBtn) {
        backBtn.addEventListener('click', function () {
            replaceIframe(defaultGameSrc);
            if (gameTitle) gameTitle.textContent = 'Boxing Random - Play Free Unblocked Game Online';
            backBtn.classList.add('hidden');
            gameCards.forEach(function (c) { c.classList.remove('active'); });
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        if (anchor.hasAttribute('data-game-src')) return;
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var headerHeight = document.querySelector('.site-header').offsetHeight || 60;
                var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

})();
