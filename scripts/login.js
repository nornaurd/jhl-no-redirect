// login.js – логіка логіну: показ «Logging in…» + спінер у центрі модалки
// Через оверлей, який накладається поверх форми, тому розміри вікна не
// змінюються (ані збільшення, ані зменшення).

(document => {
  /* --------------------------------------------------------------
   *  DOM‑референси
   * -------------------------------------------------------------- */
  const loginBtn      = /** @type {HTMLButtonElement|null} */ (document.getElementById('loginButton'));
  const emailInput    = /** @type {HTMLInputElement|null} */ (document.getElementById('emailInput'));
  const passwordInput = /** @type {HTMLInputElement|null} */ (document.getElementById('passwordInput'));
  const modal         = /** @type {HTMLElement|null} */ (document.getElementById('loginModal'));
  if (!loginBtn || !modal) return;

  /* --------------------------------------------------------------
   *  Разове підключення @keyframes spin (якщо ще немає)
   * -------------------------------------------------------------- */
  const ensureSpinKeyframes = () => {
    if (document.getElementById('inline-spinner-style')) return;
    const style = document.createElement('style');
    style.id = 'inline-spinner-style';
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  };

  /* --------------------------------------------------------------
   *  Хелпер — змінити/прибрати помилку валідації
   * -------------------------------------------------------------- */
  const setInvalid = (/** @type {HTMLInputElement|null} */ el, invalid) => {
    if (!el) return;
    const group = el.closest('.input-group');
    el.classList.toggle('invalid', invalid);
    group && group.classList.toggle('invalid', invalid);
  };

  // При вводі – одразу прибираємо помилку
  [emailInput, passwordInput].forEach(el => el && el.addEventListener('input', () => setInvalid(el, false)));

  /* --------------------------------------------------------------
   *  Клік «Continue / Log in»
   * -------------------------------------------------------------- */
  loginBtn.addEventListener('click', e => {
    e.preventDefault();

    /* 1. Перевірка заповнення полів */
    let hasError = false;
    if (!emailInput?.value.trim()) { setInvalid(emailInput, true); hasError = true; }
    if (!passwordInput?.value.trim()) { setInvalid(passwordInput, true); hasError = true; }
    if (hasError) return;

    /* 2. Зберігаємо email у sessionStorage */
    try { sessionStorage.setItem('loginEmail', emailInput.value.trim().toLowerCase()); } catch (_) {}

    /* 3. Шукаємо контейнер всередині модалки */
    const container = /** @type {HTMLElement|null} */ (
      modal.querySelector('.modal-body, .modal__body, .modal-content, .modal__content')
    );
    if (!container) return;

    // 3.1 Створюємо оверлей, який покриє контейнер (позиціонування relative)
    ensureSpinKeyframes();
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
      pointerEvents: 'none', // щоб нічого не натискалося під час логіну
      textAlign: 'center',
    });
    overlay.innerHTML = `
      <h2 class="medium-heading" style="margin:0;">Logging in…</h2>
      <div style="width:18px;height:18px;margin-top:40px;border:3px solid #000;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
    `;

    container.appendChild(overlay);

    /* 4. Редірект через 1 с */
    setTimeout(() => {
      window.location.href = 'confirm-journal-logged-in.html';
    }, 2000);
  });
})(document);
