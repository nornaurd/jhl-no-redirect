// scripts/signup.js – логіка форми реєстрації

function toggleInvalid(el, invalid) {
  if (!el) return;
  const wrapper = el.closest('.input-group') || el.closest('.checkbox-wrapper');
  if (invalid) {
    el.classList.add('invalid');
    if (wrapper) wrapper.classList.add('invalid');
  } else {
    el.classList.remove('invalid');
    if (wrapper) wrapper.classList.remove('invalid');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const createAccountBtn  = document.getElementById('createAccountButton');
  if (!createAccountBtn) return;

  const firstNameInput    = document.getElementById('firstNameInput');
  const lastNameInput     = document.getElementById('lastNameInput');
  const signupEmailInput  = document.getElementById('signupEmailInput');
  const signupPasswordInp = document.getElementById('signupPasswordInput');
  const termsCheckbox     = document.getElementById('signupCheckbox');
  const checkboxWrapper   = termsCheckbox?.closest('.checkbox-wrapper');

  [firstNameInput, lastNameInput, signupEmailInput, signupPasswordInp].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('input', () => toggleInvalid(inp, false));
  });
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', () => toggleInvalid(termsCheckbox, false));
  }

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
      if (checkboxWrapper) checkboxWrapper.classList.add('invalid');
      hasError = true;
    }

    if (hasError) return;

    const email   = signupEmailInput.value.trim().toLowerCase();
    const domain  = email.substring(email.lastIndexOf('@') + 1);
    const allowed = Array.isArray(window.recognizedDomains)
      ? window.recognizedDomains.map(d => d.toLowerCase())
      : [];

    const isDomainRecognized = allowed.includes(domain);
    showConfirmationStep(isDomainRecognized);
  });

  function showConfirmationStep(isDomainRecognized) {
    const authTitle         = document.getElementById('authTitle');
    const loginForm         = document.getElementById('loginForm');
    const signupForm        = document.getElementById('signupForm');

    if (loginForm)  loginForm.style.display  = 'none';
    if (signupForm) signupForm.style.display = 'none';

    let confirmForm = document.getElementById('confirmEmailForm');
    if (confirmForm) {
      confirmForm.style.display = 'block';
      return;
    }

    const t = pageTexts?.confirmEmail ?? {
      heading: 'Check your inbox',
      line1: 'We\'ve sent a confirmation code to your email.',
      line2: 'Enter it below to continue.',
      codePlaceholder: 'Enter the code from your email',
      continueButton: 'Continue',
      spamHint: 'Didn’t get the email? Check your spam folder.'
    };

    if (authTitle) authTitle.innerText = t.heading;

    confirmForm = document.createElement('div');
    confirmForm.id = 'confirmEmailForm';

    const p1 = document.createElement('p');
    p1.innerHTML = t.line1;
    p1.style.marginBottom = '0px';
    p1.style.fontSize = '14px';
    p1.style.lineHeight = '20px';

    const p2 = document.createElement('p');
    p2.innerText = t.line2;
    p2.style.marginBottom = '24px';
    p2.style.marginTop = '2px';
    p2.style.fontSize = '14px';
    p2.style.lineHeight = '20px';

    const group = document.createElement('div');
    group.className = 'input-group input-group-modal';
    const label = document.createElement('label');
    label.setAttribute('for', 'confirmationCodeInput');
    label.innerText = t.codeLabel ?? '';
    const codeInput = document.createElement('input');
    codeInput.type = 'text';
    codeInput.id = 'confirmationCodeInput';
    codeInput.placeholder = t.codePlaceholder;
    group.appendChild(label);
    group.appendChild(codeInput);

    const btnWrap = document.createElement('div');
    btnWrap.className = 'button-group';
    const contBtn = document.createElement('button');
    contBtn.className = 'btn btn-primary';
    contBtn.id = 'continueWithCodeButton';
    contBtn.innerText = t.continueButton;
    btnWrap.appendChild(contBtn);

    const spamHint = document.createElement('p');
    spamHint.innerText = t.spamHint;
    spamHint.style.textAlign = 'left';
    spamHint.style.fontSize = '14px';
    spamHint.style.lineHeight = '20px';
    spamHint.style.color = '#39393A';
    spamHint.style.marginBottom = '0';

    confirmForm.appendChild(p1);
    confirmForm.appendChild(p2);
    confirmForm.appendChild(group);
    confirmForm.appendChild(btnWrap);
    confirmForm.appendChild(spamHint);

    const modalContent = document.querySelector('#loginModal .modal-content');
    modalContent?.appendChild(confirmForm);

    contBtn.addEventListener('click', () => {
      const code = codeInput.value.trim();
      if (code === '000000') {
        const modal = document.getElementById('loginModal');
        if (modal) modal.style.display = 'none';

        const claimButton = document.getElementById('continueConfirmButton');
        if (claimButton) {
          const width = claimButton.offsetWidth + 'px';
          claimButton.style.width = width;
          claimButton.disabled = true;
          claimButton.innerHTML = '<span class="spinner small"></span>';

          setTimeout(() => {
            claimButton.style.width = '';
            window.location.href = isDomainRecognized
              ? 'checkout.html'
              : 'additional-info.html?from=signup';
          }, 1000);
        } else {
          window.location.href = isDomainRecognized
            ? 'checkout.html'
            : 'additional-info.html?from=signup';
        }
      } else {
        alert('Invalid code');
      }
    });
  }
});
