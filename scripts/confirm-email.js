document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('codePlaceholder');
    const button = document.getElementById('continueButton');
  
    if (!input || !button) {
      console.error('codePlaceholder або continueButton не знайдено в DOM');
      return;
    }
  
    input.addEventListener('focus', () => {
      input.classList.remove('invalid');
    });
  
    button.addEventListener('click', () => {
      const code = input.value.trim();
      input.classList.remove('invalid');
  
      if (code === '') {
        input.classList.add('invalid');
      } else if (code === '000000') {
        redirectToCheckout();
      } else {
        input.classList.add('invalid');
      }
    });
  });
  
  function redirectToCheckout() {
    document.querySelector('main').style.display = 'none';
    document.getElementById('redirectMessage').style.display = 'block';
  
    setTimeout(() => {
      window.location.href = 'checkout.html';
    }, 2000);
  }
  