document.addEventListener('DOMContentLoaded', () => {
  const from = new URLSearchParams(window.location.search).get('from');

  const emailInput = document.getElementById('additionalEmailInput');
  const emailGroup = emailInput?.parentElement;
  const infoGroup = document.getElementById('infoGroup');
  const infoText = document.getElementById('infoText');
  const infoTextarea = document.getElementById('infoTextarea');
  const continueBtn = document.getElementById('continueButton');

  let isInFallbackMode = false;

  // Початкове відображення
  if (from === 'signup') {
    document.getElementById('subtitle')?.remove();
    emailGroup?.remove();
    infoText.style.display = 'block';
    infoGroup.style.display = 'block';
    document.getElementById('noJournalEmailLink')?.remove();
  } else if (from === 'login') {
    infoText.style.display = 'none';
    infoGroup.style.display = 'none';
  }

  // Обробка кнопки Continue
  continueBtn.addEventListener('click', () => {
    // === Signup: перевірка лише textarea
    if (from === 'signup') {
      const additionalInfo = infoTextarea.value.trim();
      if (additionalInfo === '') {
        infoTextarea.classList.add('invalid');
      } else {
        infoTextarea.classList.remove('invalid');
        redirectToCheckout();
      }
      return;
    }

    // === Якщо fallback режим або emailInput не існує
    if (isInFallbackMode || !emailInput) {
      const additionalInfo = infoTextarea.value.trim();
      if (additionalInfo === '') {
        infoTextarea.classList.add('invalid');
      } else {
        infoTextarea.classList.remove('invalid');
        redirectToCheckout();
      }
      return;
    }

    // === login-flow з email
    const email = emailInput.value.trim();
    if (email === '') {
      emailInput.classList.add('invalid');
      return;
    } else {
      emailInput.classList.remove('invalid');
      document.getElementById('noJournalEmailLink')?.remove();
    }

    const domain = email.split('@')[1];
    const isDomainValid = window.recognizedDomains.includes(domain);

    if (isDomainValid) {
      window.location.href = 'confirm-email.html';
    } else {
      emailGroup?.remove();
      document.getElementById('subtitle')?.remove();
      infoText.style.display = 'block';
      infoGroup.style.display = 'block';
      isInFallbackMode = true;
    }
  });

  // Обробка натискання на "I don't have a journal email"
  document.getElementById('noJournalEmailLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    emailGroup?.remove();
    document.getElementById('subtitle')?.remove();
    document.getElementById('noJournalEmailLink')?.remove();
    infoText.style.display = 'block';
    infoGroup.style.display = 'block';
    isInFallbackMode = true;
  });
});

// Функція з затримкою перед редиректом
function redirectToCheckout() {
  document.querySelector('main').style.display = 'none';
  document.getElementById('redirectMessage').style.display = 'block';

  setTimeout(() => {
    window.location.href = 'checkout.html';
  }, 2000);
}