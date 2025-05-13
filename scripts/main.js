document.addEventListener('DOMContentLoaded', () => {
  // === Завантаження header ===
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch('partials/header.html')
      .then(res => res.text())
      .then(html => headerPlaceholder.innerHTML = html)
      .catch(err => console.error('Помилка при завантаженні header:', err));
  }

  // === Завантаження sub-header ===
  const subHeaderPlaceholder = document.getElementById('sub-header-placeholder');
  if (subHeaderPlaceholder) {
    fetch('partials/sub-header.html')
      .then(res => res.text())
      .then(html => {
        subHeaderPlaceholder.innerHTML = html;

        const showBack = document.body.dataset.showBack !== 'false';
        const showTitle = document.body.dataset.showTitle !== 'false';
        const page = document.body.dataset.page;

        const backBtn = document.getElementById('backButton');
        const titleEl = document.getElementById('subHeaderTitle');

        if (backBtn) {
          if (!showBack) {
            backBtn.style.display = 'none';
          } else {
            backBtn.addEventListener('click', e => {
              e.preventDefault();
              window.history.back();
            });
          }
        }

        if (titleEl) {
          if (!showTitle) {
            titleEl.style.display = 'none';
          } else if (page && pageTexts?.[page]?.subHeaderTitle) {
            titleEl.textContent = pageTexts[page].subHeaderTitle;
          }
        }
      })
      .catch(err => console.error('Помилка при завантаженні sub-header:', err));
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
