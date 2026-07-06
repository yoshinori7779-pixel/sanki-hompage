/* ============================================================
   福原義教 個人サイト  共通スクリプト
   - ナビ開閉（ハンバーガー）
   - スクロール連動ヘッダー
   - フェードイン（IntersectionObserver）
   - ヒーロー タイピング演出（reduced-motion 尊重）
   - お問い合わせフォーム（mailto 生成）
   - フッター年号の自動更新
   ============================================================ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- ナビ開閉 ------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---- スクロールでヘッダーの見た目を変更 ---------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- フェードイン ------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- ヒーロー タイピング演出 --------------------------- */
  var typeEl = document.querySelector('[data-type]');
  if (typeEl) {
    var words = (typeEl.getAttribute('data-type') || '').split('|').filter(Boolean);
    if (words.length) {
      if (prefersReduced) {
        typeEl.textContent = words[0];
      } else {
        var wi = 0, ci = 0, deleting = false;
        var caret = document.createElement('span');
        caret.className = 'type-caret';
        typeEl.after(caret);
        var tick = function () {
          var word = words[wi];
          ci += deleting ? -1 : 1;
          typeEl.textContent = word.slice(0, ci);
          var delay = deleting ? 55 : 105;
          if (!deleting && ci === word.length) { delay = 1500; deleting = true; }
          else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 320; }
          setTimeout(tick, delay);
        };
        setTimeout(tick, 700);
      }
    }
  }

  /* ---- 現在のページをナビでハイライト -------------------- */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#primary-nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && (href === './' || href === 'index.html'))) {
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ---- フッター年号 ------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- お問い合わせフォーム（mailto 送信方式） ----------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    // ▼ 公開前に実アドレスへ変更してください（依頼書 3-(1)）
    var TO = form.getAttribute('data-mailto') || 'contact@example.com';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.elements['name'].value || '').trim();
      var email = (form.elements['email'].value || '').trim();
      var subject = (form.elements['subject'].value || 'お問い合わせ').trim();
      var message = (form.elements['message'].value || '').trim();

      if (!name || !email || !message) {
        if (status) status.textContent = '⚠ お名前・メール・本文は必須です。';
        return;
      }

      var body =
        'お名前: ' + name + '\n' +
        'メール: ' + email + '\n' +
        '----------------------------------------\n' +
        message + '\n';

      var href = 'mailto:' + TO +
        '?subject=' + encodeURIComponent('[サイト] ' + subject) +
        '&body=' + encodeURIComponent(body);

      if (status) status.textContent = '✓ メールソフトを起動しました。送信を完了してください。';
      window.location.href = href;
    });
  }
})();
