// scripts/login.js – логіка обробки форми логіну
// Підключи цей файл після domains.js, але до інших скриптів, які можуть редиректити користувача

// Чекаємо доки DOM повністю завантажиться
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginButton');
    if (!loginBtn) return; // кнопки немає – нічого не робимо
  
    const emailInput     = document.getElementById('emailInput');
    const passwordInput  = document.getElementById('passwordInput');
  
    /**
     * Додає / прибирає клас .invalid для інпуту та його обгортки
     * @param {HTMLInputElement} input
     * @param {boolean} invalid
     */
    const setInvalid = (input, invalid) => {
      if (!input) return;
      const wrapper = input.closest('.input-group');
  
      if (invalid) {
        input.classList.add('invalid');
        if (wrapper) wrapper.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
        if (wrapper) wrapper.classList.remove('invalid');
      }
    };
  
    // При вводі даних прибираємо помилку для конкретного поля
    [emailInput, passwordInput].forEach(inp => {
      if (!inp) return;
      inp.addEventListener('input', () => setInvalid(inp, false));
    });
  
    // === Основна перевірка при кліку "Log in" ===
    loginBtn.addEventListener('click', evt => {
      evt.preventDefault();
  
      let formHasError = false;
  
      // 1. Перевірка на порожнечу
      if (!emailInput.value.trim()) {
        setInvalid(emailInput, true);
        formHasError = true;
      }
  
      if (!passwordInput.value.trim()) {
        setInvalid(passwordInput, true);
        formHasError = true;
      }
  
      if (formHasError) return; // Поля порожні – зупиняємо виконання
  
      // 2. Перевірка домену e‑mail
      const email   = emailInput.value.trim().toLowerCase();
      const domain  = email.substring(email.lastIndexOf('@') + 1);
  
      // Массив дозволених доменів задається у файлі domains.js
      const allowedDomains = Array.isArray(window.recognizedDomains)
        ? window.recognizedDomains.map(d => d.toLowerCase())
        : [];
  
      const targetPage = allowedDomains.includes(domain)
        ? 'checkout.html'
        : 'additional-info.html?from=login';
  
        const modal = document.getElementById('loginModal');
        if (modal) modal.style.display = 'none';
        
        const claimButton = document.getElementById('continueConfirmButton');
        if (claimButton) {
          claimButton.disabled = true;
          const width = claimButton.offsetWidth + 'px';
          claimButton.style.width = width;
          claimButton.innerHTML = '<span class="spinner small"></span>';
        }
        
        setTimeout(() => {
          window.location.href = targetPage;
        }, 1000);
        
    });
  });
  