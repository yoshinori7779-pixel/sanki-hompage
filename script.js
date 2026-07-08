// 凛 Bar RIN — interactions (v2 / 星野リゾート風)

document.addEventListener('DOMContentLoaded', () => {

  /* ローディングベールを消す */
  const veil = document.getElementById('veil');
  window.setTimeout(() => {
    if (veil) veil.classList.add('hide');
  }, 1000);

  /* フルスクリーンナビの開閉 */
  const menuBtn = document.getElementById('menuBtn');
  const fullNav = document.getElementById('fullNav');

  const closeNav = () => {
    fullNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  const openNav = () => {
    fullNav.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  menuBtn.addEventListener('click', () => {
    const isOpen = fullNav.classList.contains('open');
    isOpen ? closeNav() : openNav();
  });

  fullNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* スクロールで要素をふわっと表示 */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 3, 2) * 100}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

});
