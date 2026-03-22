/* Boxing Random - Main JavaScript */

(function () {
    'use strict';

    // --- Game Lazy Loading ---
    const playBtn = document.getElementById('play-btn');
    const overlay = document.getElementById('game-overlay');
    const gameFrame = document.getElementById('game-frame');

    if (playBtn && overlay && gameFrame) {
        // Load game on play button click
        function loadGame() {
            const src = gameFrame.getAttribute('data-src');
            if (src && !gameFrame.src) {
                gameFrame.src = src;
            }
            overlay.classList.add('hidden');
        }

        playBtn.addEventListener('click', loadGame);
        overlay.addEventListener('click', loadGame);
    }

    // --- Fullscreen ---
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn && gameFrame) {
        fullscreenBtn.addEventListener('click', function () {
            const container = document.getElementById('game-container');
            const el = container || gameFrame;

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
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
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
