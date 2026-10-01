// nav: solid background after scrolling, mobile menu
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
onScroll(); addEventListener('scroll', onScroll, {passive:true});
const mb = document.querySelector('.menu-btn'), ul = document.querySelector('.nav ul');
mb?.addEventListener('click', () => {
  const o = ul.classList.toggle('open'); mb.setAttribute('aria-expanded', o);
});
ul?.addEventListener('click', e => e.target.closest('a') && ul.classList.remove('open'));

// gallery: filters + lightbox
const items = [...document.querySelectorAll('figure.ph-item')];
if (items.length) {
  document.querySelector('.filters')?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    document.querySelectorAll('.filters button').forEach(x => x.classList.toggle('on', x === b));
    items.forEach(f => f.hidden = b.dataset.f !== 'all' && f.dataset.cat !== b.dataset.f);
  });
  const lb = document.querySelector('.lb'), box = lb.querySelector('.box');
  let cur = 0;
  const visible = () => items.filter(f => !f.hidden);
  const show = i => {
    const list = visible(); cur = (i + list.length) % list.length;
    const f = list[cur], media = f.querySelector('.ph, img').cloneNode(true);
    media.style.setProperty('--r', f.style.getPropertyValue('--r') || '4/3');
    box.replaceChildren(media, Object.assign(document.createElement('p'), {textContent: f.querySelector('figcaption').textContent}));
    lb.classList.add('open');
  };
  items.forEach(f => {
    f.tabIndex = 0;
    f.addEventListener('click', () => show(visible().indexOf(f)));
    f.addEventListener('keydown', e => e.key === 'Enter' && show(visible().indexOf(f)));
  });
  const close = () => lb.classList.remove('open');
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.prev').onclick = () => show(cur - 1);
  lb.querySelector('.next').onclick = () => show(cur + 1);
  lb.addEventListener('click', e => e.target === lb && close());
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
}
