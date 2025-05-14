// signup.js – реєстрація + підтвердження email (код «000000»)
// По аналогії з login.js: замість спінера в кнопці показуємо оверлей
// із текстом «Logging in…» та чорним спінером 18×18 px у центрі модалки.

function toggleInvalid(el, invalid) {
  if (!el) return;
  const wrapper = el.closest('.input-group') || el.closest('.checkbox-wrapper');
  el.classList.toggle('invalid', invalid);
  wrapper?.classList.toggle('invalid', invalid);
}

/* ===============================================================
   Разове підключення @keyframes spin (доступно й для інших скриптів)
   =============================================================== */
(function ensureSpinKeyframes() {
  if (document.getElementById('inline-spinner-style')) return;
  const style = document.createElement('style');
  style.id = 'inline-spinner-style';
  style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
})();

/* ===============================================================
   Основна логіка
   =============================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const createAccountBtn  = document.getElementById('createAccountButton');
  if (!createAccountBtn) return;

  const firstNameInput    = document.getElementById('firstNameInput');
  const lastNameInput     = document.getElementById('lastNameInput');
  const signupEmailInput  = document.getElementById('signupEmailInput');
  const signupPasswordInp = document.getElementById('signupPasswordInput');
  const termsCheckbox     = document.getElementById('signupCheckbox');
  const checkboxWrapper   = termsCheckbox?.closest('.checkbox-wrapper');

  // при вводі прибираємо помилки
  [firstNameInput, lastNameInput, signupEmailInput, signupPasswordInp].forEach(inp => {
    inp?.addEventListener('input', () => toggleInvalid(inp, false));
  });
  termsCheckbox?.addEventListener('change', () => toggleInvalid(termsCheckbox, false));

  /* ---------------- «Create account» ---------------- */
  createAccountBtn.addEventListener('click', e => {
    e.preventDefault();
    let hasError = false;

    [firstNameInput, lastNameInput, signupEmailInput, signupPasswordInp].forEach(inp => {
      if (!inp) return;
      const empty = !inp.value.trim();
      toggleInvalid(inp, empty);
      if (empty) hasError = true;
    });

    if (!termsCheckbox?.checked) {
      toggleInvalid(termsCheckbox, true);
      checkboxWrapper?.classList.add('invalid');
      hasError = true;
    }

    if (hasError) return;

    // зберігаємо email у sessionStorage
    const email = signupEmailInput.value.trim().toLowerCase();
    try { sessionStorage.setItem('loginEmail', email); } catch (_) {}

    showConfirmationStep();
  });

  /* ---------------- Крок «Confirm email» ---------------- */
  function showConfirmationStep() {
    const authTitle  = document.getElementById('authTitle');
    const loginForm  = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm && (loginForm.style.display  = 'none');
    signupForm && (signupForm.style.display = 'none');

    let confirmForm = document.getElementById('confirmEmailForm');
    if (confirmForm) {
      confirmForm.style.display = 'block';
      return;
    }

    // тексти (можна локалізувати через pageTexts)
    const t = pageTexts?.confirmEmail ?? {
      heading: 'Check your inbox',
      line1: "We've sent a confirmation code to your email.",
      line2: 'Enter it below to continue.',
      codePlaceholder: 'Enter the code from your email',
      continueButton: 'Continue',
      spamHint: "Didn’t get the email? Check your spam folder."
    };

    authTitle && (authTitle.innerText = t.heading);

    /* --- конструюємо форму --- */
    confirmForm = document.createElement('div');
    confirmForm.id = 'confirmEmailForm';

    const p1 = document.createElement('p');
    p1.innerHTML = t.line1;
    p1.style.cssText = 'margin-bottom:0;font-size:14px;line-height:20px';

    const p2 = document.createElement('p');
    p2.innerText = t.line2;
    p2.style.cssText = 'margin:2px 0 24px;font-size:14px;line-height:20px';

    const group = document.createElement('div');
    group.className = 'input-group input-group-modal';
    const label = document.createElement('label');
    label.setAttribute('for', 'confirmationCodeInput');
    label.innerText = t.codeLabel ?? '';
    const codeInput = document.createElement('input');
    codeInput.type = 'text';
    codeInput.id = 'confirmationCodeInput';
    codeInput.placeholder = t.codePlaceholder;
    group.append(label, codeInput);

    const btnWrap = document.createElement('div');
    btnWrap.className = 'button-group';
    const contBtn = document.createElement('button');
    contBtn.className = 'btn btn-primary';
    contBtn.id = 'continueWithCodeButton';
    contBtn.innerText = t.continueButton;
    btnWrap.appendChild(contBtn);

    const spamHint = document.createElement('p');
    spamHint.innerText = t.spamHint;
    spamHint.style.cssText = 'text-align:left;font-size:14px;line-height:20px;color:#39393A;margin-bottom:0';

    confirmForm.append(p1, p2, group, btnWrap, spamHint);
    document.querySelector('#loginModal .modal-content')?.appendChild(confirmForm);

    /* --- натискання «Continue» --- */
    contBtn.addEventListener('click', () => {
      const code = codeInput.value.trim();
      if (code === '000000') {
        /* ---------- ОВЕРЛЕЙ З ТЕКСТОМ + СПІНЕРОМ ---------- */
        const modal = document.getElementById('loginModal');
        if (!modal) return;
        const container = modal.querySelector('.modal-body, .modal__body, .modal-content, .modal__content');
        if (!container) return;

        // Relative для контейнера, щоб розмістити overlay абсолютно
        container.style.position = 'relative';

        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
          position: 'absolute',
          inset: 0,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          textAlign: 'center',
        });
        overlay.innerHTML = `
          <h2 class="medium-heading" style="margin:0;">Creating account and logging in…</h2>
          <div style="width:18px;height:18px;margin-top:40px;border:3px solid #000;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
        `;

        container.appendChild(overlay);

        // редірект через 1 с
        setTimeout(() => {
          window.location.href = 'confirm-journal-business-logged-in.html';
        }, 2000);
      } else {
        toggleInvalid(codeInput, true);
      }
    });
  }
});