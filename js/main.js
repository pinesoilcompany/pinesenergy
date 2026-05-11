const mobileToggle = document.getElementById('mobileToggle');
const nav = document.querySelector('.main-nav');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    if (nav.style.display === 'block') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'block';
    }
  });
}
