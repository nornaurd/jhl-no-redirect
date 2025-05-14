// confirm-journal-logged-in.js – редірект після кліку «Confirm and continue»
// Спінер GIF (assets/spinner.gif) більше НЕ використовується.
// 1) Робимо сторінку видимою (#page-content).
// 2) На клік перевіряємо email, блокуємо кнопку, показуємо невеликий CSS‑спінер у кнопці.
// 3) Визначаємо цільову сторінку та редіректимо.
// 4) Якщо email відсутній — повертаємо на confirm-journal.html.

/**
 * Перевіряє, чи email належить «інституційним» доменам: .edu, .ac.uk тощо
 * або входить у перелік directList.
 * @param {string} email
 * @returns {boolean}
 */
function isInstitutionalEmail(email) {
  const domain = (email.split('@')[1] || '').toLowerCase();

  // Шаблон академічних доменів
  const academicPattern = /\.(edu|edu\.[a-z]{2}|ac\.[a-z]{2})$/i;

  // Перелік доменів можна розширювати
  const directList = [
    'biguni.org',
    'research‑centre.com',
    'journal.com'
  ];

  return academicPattern.test(domain) || directList.includes(domain);
}

// === Основний сценарій ===
document.addEventListener('DOMContentLoaded', () => {
  /** @type {HTMLButtonElement | null} */
  const confirmBtn = document.getElementById('continueConfirmButton'); // кнопка «Confirm and continue»
  /** @type {HTMLElement | null} */
  const pageContent = document.getElementById('page-content'); // головний контейнер сторінки

  // Робимо контент видимим (у HTML він був display:none)
  if (pageContent) pageContent.style.display = 'block';

  if (!confirmBtn) return; // кнопки немає — нічого робити

  confirmBtn.addEventListener('click', () => {
    // 1. Беремо email із sessionStorage
    const email = sessionStorage.getItem('loginEmail');
    if (!email) {
      window.location.href = 'confirm-journal.html';
      return;
    }

    // 2. Блокуємо кнопку та показуємо CSS‑спінер у ній
    confirmBtn.disabled = true;
    confirmBtn.style.width = confirmBtn.offsetWidth + 'px';
    confirmBtn.innerHTML = '<span class="spinner small"></span>'; // використовуємо лише CSS, без GIF

    // 3. Визначаємо, на яку сторінку йти
    const targetPage = isInstitutionalEmail(email)
      ? 'checkout.html'
      : 'additional-info.html?from=login';

    // 4. Коротка пауза → редірект
    setTimeout(() => {
      try { sessionStorage.removeItem('loginEmail'); } catch (_) {}
      window.location.href = targetPage;
    }, 600);
  });
});
