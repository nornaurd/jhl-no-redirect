document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchPlaceholder');
    const searchErrorText = document.getElementById('searchError');
    const continueBtn = document.getElementById('continueIndexButton');
    const dropdown = document.getElementById('dropdown');
  
    if (continueBtn) {
      continueBtn.addEventListener('click', e => {
        e.preventDefault();
        let valid = true;
  
        // Перевірка: чи введено щось у поле
        if (!searchInput.value.trim()) {
          searchInput.classList.add('invalid');
          searchErrorText.style.display = 'block';
          valid = false;
        } else {
          searchInput.classList.remove('invalid');
          searchErrorText.style.display = 'none';
        }
  
        // Якщо все ок – переходимо на confirm-journal.html
        if (valid) {
          window.location.href = 'confirm-journal.html';
        }
      });
    }
  
    // Відображення dropdown при введенні тексту
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        dropdown.style.display = searchInput.value.trim() ? 'block' : 'none';
        dropdown.innerHTML = `
          <div class="dropdown-item">
            <div class="dropdown-title">Nature Sciences</div>
            <div class="dropdown-issn">Wiley · 1741-7007</div>
          </div>`;
      });
  
      dropdown.addEventListener('click', e => {
        const item = e.target.closest('.dropdown-item');
        if (item) {
          searchInput.value = '1741-7007, Nature Sciences';
          dropdown.style.display = 'none';
        }
      });
  
      searchInput.addEventListener('blur', () => {
        setTimeout(() => (dropdown.style.display = 'none'), 150);
      });
    }
  });
  