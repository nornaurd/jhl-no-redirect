document.addEventListener('DOMContentLoaded', () => {
  // === Завантаження header ===
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    const useLoggedInHeader = document.body.dataset.loggedIn === 'true';
    const headerFile = useLoggedInHeader ? 'partials/logged-in-header.html' : 'partials/header.html';
    fetch(headerFile)
      .then(res => res.text())
      .then(html => headerPlaceholder.innerHTML = html)
      .catch(err => console.error('Помилка при завантаженні header:', err));
  }

  // === Підтягування текстів для сторінки
  if (typeof pageTexts !== 'undefined') {
    const page = document.body.dataset.page;
    if (page && pageTexts[page]) {
      const texts = pageTexts[page];
      for (const [id, text] of Object.entries(texts)) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.matches('input, textarea')) {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    }

    // === Додатково: підтягування текстів для модального логіну
    if (pageTexts.login) {
      const loginTexts = pageTexts.login;
      for (const [id, text] of Object.entries(loginTexts)) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.matches('input, textarea')) {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    }
  }
});
