/* =========================================================
   HC TECH Inc. — interaction layer
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- i18n ---------------- */
  var META = {
    kr: {
      title: '(주)에이치씨테크 | HC TECH Inc. — 반도체·산업용 초고순도 피팅 & 밸브',
      desc: '(주)에이치씨테크는 1998년 설립 이래 반도체·디스플레이·산업 플랜트의 가스·유체 라인에 초고순도(UHP) 피팅·밸브와 계장용 피팅·밸브를 공급해 온 전문 기업입니다. BMT(SUPERLOK) 서울·경기 공식 영업·서비스 파트너.',
      lang: 'ko',
      langLabel: 'EN',
      langAria: 'Switch language to English'
    },
    en: {
      title: 'HC TECH Inc. — Ultra-high-purity fittings & valves for semiconductors',
      desc: 'Since 1998, HC TECH Inc. has supplied ultra-high-purity fittings and valves and instrumentation components for the gas and fluid lines of semiconductor, display and industrial plants. Official Seoul & Gyeonggi partner of BMT (SUPERLOK).',
      lang: 'en',
      langLabel: 'KR',
      langAria: '한국어로 전환'
    }
  };

  var PH = {
    kr: {
      'f-company': '(주)회사명',
      'f-name': '홍길동',
      'f-phone': '010-0000-0000',
      'f-email': 'name@company.com',
      'f-message': '제품 사양, 수량, 납기 등 필요한 내용을 적어 주세요.'
    },
    en: {
      'f-company': 'Company name',
      'f-name': 'Your name',
      'f-phone': '+82 10 0000 0000',
      'f-email': 'name@company.com',
      'f-message': 'Specification, quantity, delivery date — whatever you need.'
    }
  };

  var ERR = {
    kr: {
      required: '담당자명과 문의 내용을 입력해 주세요.',
      email: '이메일 주소 형식을 확인해 주세요.'
    },
    en: {
      required: 'Please fill in your name and message.',
      email: 'Please check the email address format.'
    }
  };

  var TOAST = {
    kr: { email: '이메일 주소를 복사했습니다', inquiry: '문의 내용을 복사했습니다', mail: '메일 앱을 엽니다' },
    en: { email: 'Email address copied', inquiry: 'Message copied', mail: 'Opening your mail app' }
  };

  var state = { lang: 'kr', errKey: null };

  function t(group, key) {
    return TOAST[state.lang][key] || group;
  }

  function applyLang(lang, persist) {
    state.lang = lang;
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', META[lang].lang);

    document.querySelectorAll('[data-kr][data-en]').forEach(function (el) {
      var val = lang === 'kr' ? el.getAttribute('data-kr') : el.getAttribute('data-en');
      if (val !== null) el.innerHTML = val;
    });

    Object.keys(PH[lang]).forEach(function (id) {
      var input = document.getElementById(id);
      if (input) input.setAttribute('placeholder', PH[lang][id]);
    });

    document.title = META[lang].title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', META[lang].desc);

    var langBtn = document.getElementById('langToggle');
    if (langBtn) {
      langBtn.querySelector('.lang__label').textContent = META[lang].langLabel;
      langBtn.setAttribute('aria-label', META[lang].langAria);
    }

    if (state.errKey) showError(state.errKey);

    if (persist) {
      try { localStorage.setItem('hctech-lang', lang); } catch (e) {}
    }
  }

  /* ---------------- toast ---------------- */
  var toastEl = document.getElementById('toast');
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2400);
  }

  /* ---------------- copy ---------------- */
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () {
        return legacyCopy(text);
      });
    }
    return Promise.resolve(legacyCopy(text));
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyText(btn.getAttribute('data-copy')).then(function (ok) {
        toast(ok ? t('', 'email') : btn.getAttribute('data-copy'));
      });
    });
  });

  /* ---------------- nav ---------------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var navMobile = document.getElementById('navMobile');

  function onScroll() {
    if (window.scrollY > 14) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function closeMenu() {
    nav.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (navMobile) navMobile.hidden = true;
  }

  if (burger && navMobile) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      navMobile.hidden = !open;
    });
    navMobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------------- lang toggle ---------------- */
  var langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      applyLang(state.lang === 'kr' ? 'en' : 'kr', true);
    });
  }

  var saved = null;
  try { saved = localStorage.getItem('hctech-lang'); } catch (e) {}
  var initial = saved === 'en' || saved === 'kr' ? saved : (navigator.language || '').toLowerCase().indexOf('ko') === 0 ? 'kr' : 'kr';
  applyLang(initial, false);

  /* ---------------- reveal ---------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------- active nav link ---------------- */
  var sections = ['about', 'products', 'capability', 'location', 'contact'];
  var linkMap = {};
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var id = a.getAttribute('href').replace('#', '');
    linkMap[id] = a;
  });
  if ('IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) navIO.observe(el);
    });
  }

  /* ---------------- product filter ---------------- */
  var chips = document.querySelectorAll('.chip');
  var grid = document.getElementById('productGrid');
  var cards = document.querySelectorAll('#productGrid .card');

  function applyFilter(cat) {
    var visible = 0;
    cards.forEach(function (card) {
      var isCta = card.getAttribute('data-cat') === 'cta';
      var match = cat === 'all' ? true : (!isCta && card.getAttribute('data-cat') === cat);
      card.classList.toggle('is-hidden', !match);
      if (match) {
        visible++;
        card.classList.remove('is-in');
        void card.offsetWidth;
        card.classList.add('is-in');
      }
    });
    if (grid) {
      grid.classList.remove('cols-1', 'cols-2', 'cols-3');
      if (visible <= 1) grid.classList.add('cols-1');
      else if (visible === 2) grid.classList.add('cols-2');
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        c.classList.remove('is-active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      applyFilter(chip.getAttribute('data-filter'));
    });
  });

  /* ---------------- card pointer glow ---------------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------------- contact form ---------------- */
  var form = document.getElementById('inquiryForm');
  var errorEl = document.getElementById('formError');

  function showError(key) {
    if (!errorEl) return;
    state.errKey = key;
    errorEl.textContent = ERR[state.lang][key];
    errorEl.hidden = false;
  }
  function clearError() {
    state.errKey = null;
    if (errorEl) errorEl.hidden = true;
  }

  function fieldValue(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function buildBody() {
    var isKo = state.lang === 'kr';
    var cat = document.getElementById('f-category');
    var catLabel = cat.options[cat.selectedIndex].textContent.trim();
    var lines = isKo ? [
      '홈페이지 문의',
      '',
      '회사명: ' + (fieldValue('f-company') || '-'),
      '담당자명: ' + fieldValue('f-name'),
      '연락처: ' + (fieldValue('f-phone') || '-'),
      '이메일: ' + (fieldValue('f-email') || '-'),
      '관심 제품군: ' + catLabel,
      '',
      '문의 내용',
      '----------------------------',
      fieldValue('f-message')
    ] : [
      'Website inquiry',
      '',
      'Company: ' + (fieldValue('f-company') || '-'),
      'Name: ' + fieldValue('f-name'),
      'Phone: ' + (fieldValue('f-phone') || '-'),
      'Email: ' + (fieldValue('f-email') || '-'),
      'Product of interest: ' + catLabel,
      '',
      'Message',
      '----------------------------',
      fieldValue('f-message')
    ];
    return lines.join('\n');
  }

  function buildSubject() {
    var company = fieldValue('f-company');
    var name = fieldValue('f-name');
    var isKo = state.lang === 'kr';
    if (isKo) return '[홈페이지 문의] ' + (company ? company + ' · ' : '') + name;
    return '[Website inquiry] ' + (company ? company + ' · ' : '') + name;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      if (!fieldValue('f-name') || !fieldValue('f-message')) {
        showError('required');
        (!fieldValue('f-name') ? document.getElementById('f-name') : document.getElementById('f-message')).focus();
        return;
      }
      var email = fieldValue('f-email');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        showError('email');
        document.getElementById('f-email').focus();
        return;
      }

      var href = 'mailto:smkoh@hctech-inc.co.kr'
        + '?subject=' + encodeURIComponent(buildSubject())
        + '&body=' + encodeURIComponent(buildBody());

      toast(t('', 'mail'));
      window.location.href = href;
    });
  }

  var copyInquiry = document.getElementById('copyInquiry');
  if (copyInquiry) {
    copyInquiry.addEventListener('click', function () {
      copyText(buildSubject() + '\n\n' + buildBody()).then(function (ok) {
        toast(ok ? t('', 'inquiry') : t('', 'inquiry'));
      });
    });
  }

  /* ---------------- misc: year ---------------- */
  var yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
