/* ============================================================
   site.js — header, rodapé e comportamentos compartilhados.
   Fonte única: editar aqui atualiza todas as páginas.

   Cada página declara:
     <body data-page="trabalho" data-lang="pt" data-root="../">
   ============================================================ */
(function () {
  'use strict';

  var body = document.body;
  var root = body.dataset.root || '';
  var page = body.dataset.page || '';
  var lang = body.dataset.lang === 'en' ? 'en' : 'pt';

  document.documentElement.classList.remove('no-js');

  /* ---------- Dados ---------- */
  var SOCIAL = {
    github:   'https://github.com/Oceanthief',
    linkedin: 'https://www.linkedin.com/in/victor-ramos-alves-de-matos-1b3007116/',
    kaggle:   'https://www.kaggle.com/ramostherunning',
    email:    'victorramosdematos@hotmail.com'
  };

  var NAV = {
    pt: [
      { id: 'trabalho',    label: 'Trabalho',    href: 'projetos.html' },
      { id: 'experiencia', label: 'Experiência', href: 'experiencia.html' },
      { id: 'sobre',       label: 'Sobre',       href: 'about.html' },
      { id: 'lab',         label: 'Lab',         href: 'blog.html' },
      { id: 'cv',          label: 'Currículo',   href: 'cv.html' },
      { id: 'contato',     label: 'Contato',     href: 'index.html#contato' }
    ],
    en: [
      { id: 'trabalho',    label: 'Work',       href: 'index.html#trabalho' },
      { id: 'experiencia', label: 'Experience', href: 'index.html#experiencia' },
      { id: 'sobre',       label: 'About',      href: 'about.html' },
      { id: 'cv',          label: 'Résumé',     href: 'cv.html' },
      { id: 'contato',     label: 'Contact',    href: 'index.html#contato' }
    ]
  };

  var T = {
    pt: {
      role: 'Data & Business Analytics',
      menu: 'Menu',
      theme: 'Alternar modo escuro',
      mainNav: 'Navegação principal',
      skip: 'Pular para o conteúdo',
      switchTo: 'English version',
      switchLabel: 'EN',
      footerTag: 'Data & Business Analytics — unindo conhecimento de negócios, analytics e engenharia de dados.',
      built: 'Site estático · HTML, CSS e JavaScript · GitHub Pages',
      email: 'E-mail'
    },
    en: {
      role: 'Data & Business Analytics',
      menu: 'Menu',
      theme: 'Toggle dark mode',
      mainNav: 'Main navigation',
      skip: 'Skip to content',
      switchTo: 'Versão em português',
      switchLabel: 'PT',
      footerTag: 'Data & Business Analytics — bridging business domain knowledge, analytics and data engineering.',
      built: 'Static site · HTML, CSS and JavaScript · GitHub Pages',
      email: 'Email'
    }
  }[lang];

  /* Caminho para a versão no outro idioma.
     PT vive na raiz; EN vive em /en/. */
  var altHref = (function () {
    if (lang === 'pt') { return root + 'en/index.html'; }
    return root + '../index.html';
  })();

  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.021C22 6.484 17.522 2 12 2z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    kaggle: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.334z"/></svg>'
  };

  /* ---------- Header ---------- */
  var links = NAV[lang];
  var navHtml = links.map(function (l) {
    var isActive = l.id === page;
    return '<a href="' + root + l.href + '" class="nav-link' + (isActive ? ' active' : '') + '"' +
           (isActive ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
  }).join('');

  var socialHtml =
    '<a href="' + SOCIAL.github + '" class="nav-icon" aria-label="GitHub" target="_blank" rel="noopener">' + ICONS.github + '</a>' +
    '<a href="' + SOCIAL.linkedin + '" class="nav-icon" aria-label="LinkedIn" target="_blank" rel="noopener">' + ICONS.linkedin + '</a>' +
    '<a href="' + SOCIAL.kaggle + '" class="nav-icon" aria-label="Kaggle" target="_blank" rel="noopener">' + ICONS.kaggle + '</a>' +
    '<a href="' + altHref + '" class="lang-switch" aria-label="' + T.switchTo + '" hreflang="' + (lang === 'pt' ? 'en' : 'pt-BR') + '">' + T.switchLabel + '</a>' +
    '<button class="theme-toggle" id="themeToggle" type="button" aria-label="' + T.theme + '">' +
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>' +
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
    '</button>';

  var header =
    '<a href="#conteudo" class="skip-link">' + T.skip + '</a>' +
    '<header class="site-header" id="siteHeader">' +
      '<div class="wrap header-inner">' +
        '<a href="' + root + 'index.html" class="site-name">' +
          'Victor Ramos<span class="site-name-role">' + T.role + '</span>' +
        '</a>' +
        '<button class="nav-toggle" id="navToggle" type="button" aria-label="' + T.menu + '" aria-expanded="false" aria-controls="mainNav">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
        '</button>' +
        '<nav class="nav" id="mainNav" aria-label="' + T.mainNav + '">' +
          navHtml +
          '<span class="nav-divider" aria-hidden="true"></span>' +
          '<span class="nav-social">' + socialHtml + '</span>' +
        '</nav>' +
      '</div>' +
    '</header>';

  /* ---------- Rodapé ---------- */
  var footerNav = links.map(function (l) {
    return '<a href="' + root + l.href + '">' + l.label + '</a>';
  }).join('');

  var footer =
    '<footer class="site-footer">' +
      '<div class="wrap">' +
        '<div class="footer-inner">' +
          '<div>' +
            '<div class="footer-brand">Victor Ramos Alves de Matos</div>' +
            '<p class="footer-tag">' + T.footerTag + '</p>' +
          '</div>' +
          '<nav class="footer-nav" aria-label="' + T.mainNav + '">' +
            footerNav +
            '<a href="' + SOCIAL.github + '" target="_blank" rel="noopener">GitHub</a>' +
            '<a href="' + SOCIAL.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>' +
            '<a href="' + SOCIAL.kaggle + '" target="_blank" rel="noopener">Kaggle</a>' +
            '<a href="mailto:' + SOCIAL.email + '">' + T.email + '</a>' +
          '</nav>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' Victor Ramos</span>' +
          '<span>' + T.built + '</span>' +
        '</div>' +
      '</div>' +
    '</footer>';

  body.insertAdjacentHTML('afterbegin', header);
  body.insertAdjacentHTML('beforeend', footer);

  /* ---------- Menu móvel ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  function closeNav() {
    if (!nav || !toggle) { return; }
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) { closeNav(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
        toggle.focus();
      }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeNav(); }
    });
  }

  /* ---------- Tema ---------- */
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (err) { /* modo privado */ }
    });
  }

  /* ---------- Borda do header ao rolar ---------- */
  var siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    var onScroll = function () {
      siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Revelação e contadores ----------
     Degradam para o estado final quando não há suporte
     ou quando o usuário pede menos movimento. */
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var revealables = document.querySelectorAll('.reveal');
  var counters = document.querySelectorAll('[data-count-to]');

  function finishCounter(el) {
    el.textContent = el.dataset.countFormatted || el.dataset.countTo;
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-visible'); });
    Array.prototype.forEach.call(counters, finishCounter);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        io.unobserve(el);

        if (el.classList.contains('reveal')) {
          var delay = parseInt(el.dataset.revealDelay || '0', 10);
          setTimeout(function () { el.classList.add('is-visible'); }, delay);
        }
        if (el.hasAttribute('data-count-to')) { animateCount(el); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
    /* O valor final permanece no HTML até o momento de animar: se o
       observador nunca disparar, o número correto continua visível. */
    Array.prototype.forEach.call(counters, function (el) { io.observe(el); });
  }

  function animateCount(el) {
    var target = parseFloat(el.dataset.countTo);
    if (isNaN(target)) { return finishCounter(el); }

    var decimals = parseInt(el.dataset.countDecimals || '0', 10);
    el.textContent = '0';
    var locale = lang === 'en' ? 'en-US' : 'pt-BR';
    var duration = 1100;
    var start = null;

    function frame(now) {
      if (start === null) { start = now; }
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic
      var value = target * eased;

      el.textContent = value.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });

      if (p < 1) { requestAnimationFrame(frame); }
      else { finishCounter(el); }
    }
    requestAnimationFrame(frame);
  }
})();
