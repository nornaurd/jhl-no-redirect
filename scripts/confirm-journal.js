document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const subHeaderPlaceholder = document.getElementById('sub-header-placeholder');
    const loader = document.getElementById('loader');
    const content = document.getElementById('page-content');
  
    // Завантаження header
    const loadHeader = fetch('partials/header.html')
      .then(res => res.text())
      .then(html => {
        headerPlaceholder.innerHTML = html;
      });
  
    // Завантаження sub-header
      const loadSubHeader = fetch('partials/sub-header.html')
      .then(res => res.text())
      .then(html => {
        subHeaderPlaceholder.innerHTML = html;

        const showBack = document.body.dataset.showBack !== 'false';
        const showTitle = document.body.dataset.showTitle !== 'false';

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

        if (titleEl && !showTitle) {
          titleEl.style.display = 'none';
        }
      });

  
    // Коли хедер і сабхедер завантажені — показати спінер, а потім контент
    Promise.all([loadHeader, loadSubHeader]).then(() => {
      if (loader) {
        loader.style.display = 'flex';
      }
  
      setTimeout(() => {
        if (loader) loader.style.display = 'none';
        if (content) content.style.display = 'block';
  
        initConfirmJournalPage(); // Запуск основної логіки
      }, 1000);
    });
  
    // Підтягування текстів — можна залишити тут
    if (typeof pageTexts !== 'undefined') {
      const page = document.body.dataset.page;
      if (page && pageTexts[page]) {
        const texts = pageTexts[page];
        for (const [id, text] of Object.entries(texts)) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.matches('input')) {
            el.placeholder = text;
          } else {
            el.innerHTML = text;
          }
        }
      }
    }
  });
  
  function initConfirmJournalPage() {
    const checkbox = document.getElementById('confirmationCheckbox');
    const checkboxWrapper = document.querySelector('.checkbox-wrapper');
    const continueButton = document.getElementById('continueConfirmButton');
  
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeLoginModal');
  
    const authTitle = document.getElementById('authTitle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
  
    const signupPrompt = document.getElementById('signupPrompt');
    const signinPrompt = document.getElementById('signinPrompt');
  
    // === Відкриття модального вікна після перевірки чекбокса ===
    if (continueButton && modal) {
      continueButton.addEventListener('click', e => {
        e.preventDefault();
  
        if (!checkbox.checked) {
          checkbox.classList.add('invalid');
          checkboxWrapper.classList.add('invalid');
          return;
        }
  
        checkbox.classList.remove('invalid');
        checkboxWrapper.classList.remove('invalid');
  
        switchToLogin(); // завжди починаємо з логіну
        modal.style.display = 'flex';
      });
    }
  
    // === Закриття модалки по ✕ ===
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
  
    // === При зміні чекбокса зняти помилку ===
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        checkbox.classList.remove('invalid');
        checkboxWrapper.classList.remove('invalid');
      });
    }
  
    // === Перемикання на форму реєстрації ===
    if (signupPrompt) {
      signupPrompt.addEventListener('click', e => {
        const link = e.target.closest('#switchToSignup');
        if (link) {
          e.preventDefault();
          switchToSignup();
        }
      });
    }
  
    // === Перемикання на форму логіну ===
    if (signinPrompt) {
      signinPrompt.addEventListener('click', e => {
        const link = e.target.closest('#switchToLogin');
        if (link) {
          e.preventDefault();
          switchToLogin();
        }
      });
    }
  
    // === Перемикачі ===
    function switchToLogin() {
      if (!pageTexts.login) return;
      if (authTitle) authTitle.innerHTML = pageTexts.login.loginTitle;
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
  
      for (const [id, text] of Object.entries(pageTexts.login)) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.matches('input, textarea')) {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    }
  
    function switchToSignup() {
      if (!pageTexts.signup) return;
      if (authTitle) authTitle.innerHTML = pageTexts.signup.authTitle;
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
  
      for (const [id, text] of Object.entries(pageTexts.signup)) {
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
  
  