/* ============================================
   GioTech Ingeniería - Landing Page QR
   JavaScript - Animaciones y funcionalidad
   ============================================ */

(function () {
    'use strict';

    /* ---- SCROLL REVEAL ---- 
       Detecta elementos con [data-reveal] y los anima al entrar en viewport */
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('[data-reveal]');

        if (!revealElements.length) return;

        // Usar IntersectionObserver si está disponible
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        // Agregar delay escalonado por grupo
                        var card = entry.target;
                        var parent = card.parentElement;
                        var siblings = parent.parentElement.querySelectorAll('[data-reveal]');
                        var index = Array.prototype.indexOf.call(siblings, card);
                        var delay = index * 100; // 100ms entre cada card

                        setTimeout(function () {
                            card.classList.add('revealed');
                        }, delay);

                        observer.unobserve(card);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback: mostrar todos sin animación
            revealElements.forEach(function (el) {
                el.classList.add('revealed');
            });
        }
    }

    /* ---- SMOOTH SCROLL para enlaces internos ---- */
    function initSmoothScroll() {
        var internalLinks = document.querySelectorAll('a[href^="#"]');

        internalLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    var navbarHeight = document.querySelector('.navbar-giotech').offsetHeight;
                    var targetPosition = targetElement.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /* ---- NAVBAR SCROLL EFFECT ----
       Agrega sombra al navbar cuando hay scroll */
    function initNavbarScroll() {
        var navbar = document.querySelector('.navbar-giotech');
        if (!navbar) return;

        var scrollThreshold = 50;

        window.addEventListener('scroll', function () {
            if (window.scrollY > scrollThreshold) {
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    /* ---- PARALLAX SUAVE en Hero ----
       Movimiento sutil del fondo del hero */
    function initParallax() {
        var heroGrid = document.querySelector('.hero-grid');
        if (!heroGrid) return;

        // Solo en desktop para performance
        if (window.innerWidth < 992) return;

        window.addEventListener('scroll', function () {
            var scrolled = window.scrollY;
            if (scrolled < 800) {
                heroGrid.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
            }
        });
    }

    /* ---- WHATSAPP DEEP LINK ----
       Compatible con WhatsApp normal Y WhatsApp Business.
       No especifica paquete para que Android elija la app disponible.
       Si el usuario tiene ambas, Android muestra el selector. */
    function initWhatsappLinks() {
        var waLinks = document.querySelectorAll('a[href*="api.whatsapp.com"]');

        waLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                var url = new URL(this.href);
                var phone = url.searchParams.get('phone');
                var text = url.searchParams.get('text') || '';
                var encodedText = encodeURIComponent(text);

                var userAgent = navigator.userAgent || '';
                var isAndroid = /Android/i.test(userAgent);
                var isIOS = /iPhone|iPad|iPod/i.test(userAgent);

                if (isAndroid) {
                    // Sin package= para que Android elija entre WhatsApp o Business
                    var intentUrl = 'intent://send?phone=' + phone + '&text=' + encodedText 
                        + '#Intent;scheme=whatsapp;S.browser_fallback_url=https%3A%2F%2Fwa.me%2F' + phone + '%3Ftext%3D' + encodedText + ';end';
                    window.location.href = intentUrl;
                } else if (isIOS) {
                    window.location.href = 'https://api.whatsapp.com/send?phone=' + phone + '&text=' + encodedText;
                } else {
                    window.open('https://web.whatsapp.com/send?phone=' + phone + '&text=' + encodedText, '_blank');
                }
            });
        });
    }
    function initWhatsappFloat() {
        var floatBtn = document.querySelector('.whatsapp-float');
        if (!floatBtn) return;

        // Inicialmente oculto
        floatBtn.style.opacity = '0';
        floatBtn.style.pointerEvents = 'none';
        floatBtn.style.transform = 'scale(0.5)';

        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                floatBtn.style.opacity = '1';
                floatBtn.style.pointerEvents = 'auto';
                floatBtn.style.transform = 'scale(1)';
            } else {
                floatBtn.style.opacity = '0';
                floatBtn.style.pointerEvents = 'none';
                floatBtn.style.transform = 'scale(0.5)';
            }
        });
    }

    /* ---- INIT ---- */
    function init() {
        initScrollReveal();
        initSmoothScroll();
        initNavbarScroll();
        initParallax();
        initWhatsappLinks();
        initWhatsappFloat();
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
