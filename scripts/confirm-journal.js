/**
 * confirm‑journal.js — версія без чекбокса confirmationCheckbox
 * Додавайте файл без змін, без жодних символів «…».
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------
     1. Завантажуємо хедер (звичайний або залогіненого користувача)
  ------------------------------------------------------------------ */
  const headerPlaceholder = document.getElementById('header-placeholder');
  const isLoggedIn        = document.body.dataset.loggedIn === 'true';
  const headerFile        = isLoggedIn
      ? 'partials/logged-in-header.html'
      : 'partials/header.html';

  const headerPromise = headerPlaceholder
    ? fetch(headerFile)
        .then(res => res.text())
        .then(html => { headerPlaceholder.innerHTML = html; })
        .catch(console.error)
    : Promise.resolve();

  /* ------------------------------------------------------------------
     2. Показуємо спінер → контент
        (коротка затримка, щоб хедер устиг відмалюватись)
  ------------------------------------------------------------------ */
  headerPromise.then(() => {
    const loader  = document.getElementById('loader');
    const content = document.getElementById('page-content');
    setTimeout(() => {
      if (loader)  loader.style.display  = 'none';
      if (content) content.style.display = 'block';
      initConfirmJournalPage();
    }, 300);   // 0,3 с — змініть за потреби
  });

  /* ------------------------------------------------------------------
     3. Підставляємо тексти для цієї сторінки
  ------------------------------------------------------------------ */
  if (typeof pageTexts !== 'undefined') {
    const page = document.body.dataset.page;            // "confirmJournal"
    if (page && pageTexts[page]) {
      Object.entries(pageTexts[page]).forEach(applyText);
    }
  }

  function applyText([id, text]) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.matches('input, textarea')) el.placeholder = text;
    else                               el.innerHTML   = text;
  }
});

/* ==================================================================
   initConfirmJournalPage  – логіка без чекбокса
================================================================== */
function initConfirmJournalPage() {
  /* ---- DOM‑елементи ---- */
  const continueBtn  = document.getElementById('continueConfirmButton');

  const modal        = document.getElementById('loginModal');
  const closeBtn     = document.getElementById('closeLoginModal');

  const authTitle    = document.getElementById('authTitle');
  const loginForm    = document.getElementById('loginForm');
  const signupForm   = document.getElementById('signupForm');

  const signupPrompt = document.getElementById('signupPrompt');
  const signinPrompt = document.getElementById('signinPrompt');

  /* ---- відкриваємо модалку одразу ---- */
  if (continueBtn && modal) {
    continueBtn.addEventListener('click', e => {
      e.preventDefault();
      switchToLogin();
      modal.style.display = 'flex';
    });
  }

  /* ---- закриваємо модалку ---- */
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  }

  /* ---- перемикаємо Login ↔ Signup ---- */
  if (signupPrompt) {
    signupPrompt.addEventListener('click', e => {
      if (e.target.closest('#switchToSignup')) {
        e.preventDefault();
        switchToSignup();
      }
    });
  }

  if (signinPrompt) {
    signinPrompt.addEventListener('click', e => {
      if (e.target.closest('#switchToLogin')) {
        e.preventDefault();
        switchToLogin();
      }
    });
  }

  /* ---- допоміжні функції ---- */
  function switchToLogin() {
    if (!pageTexts.login) return;
    if (authTitle) authTitle.innerHTML = pageTexts.login.loginTitle;
    loginForm.style.display  = 'block';
    signupForm.style.display = 'none';
    Object.entries(pageTexts.login).forEach(applyText);
  }

  function switchToSignup() {
    if (!pageTexts.signup) return;
    if (authTitle) authTitle.innerHTML = pageTexts.signup.authTitle;
    loginForm.style.display  = 'none';
    signupForm.style.display = 'block';
    Object.entries(pageTexts.signup).forEach(applyText);
  }

  function applyText([id, text]) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.matches('input, textarea')) el.placeholder = text;
    else                               el.innerHTML   = text;
  }
}
