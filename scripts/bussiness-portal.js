document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо тексти для модального вікна
    const t = pageTexts?.bussinessPortal ?? {
      heading: "Welcome to Business Portal",
      description: "You now have access to your business dashboard.",
      bullets: ["Manage your journals", "Track submissions", "Access reports"],
      buttonText: "Go to dashboard"
    };
  
    // Створюємо модальне вікно
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
  
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
  
    // Кнопка закриття
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-button';
    closeBtn.setAttribute('aria-label', 'Close modal');
    const closeImg = document.createElement('img');
    closeImg.src = 'assets/ModalCloseButton.svg';
    closeImg.alt = 'Close';
    closeBtn.appendChild(closeImg);
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Контент модалки
    const heading = document.createElement('h2');
    heading.className = 'medium-heading';
    heading.innerText = t.heading;
  
    const paragraph = document.createElement('p');
    paragraph.innerText = t.description;
  
    const ul = document.createElement('ul');
    ul.className = 'summary-bullets';
    t.bullets.forEach(text => {
      const li = document.createElement('li');
      li.innerText = text;
      ul.appendChild(li);
    });
  
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
  
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerText = t.buttonText;
    btn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    buttonGroup.appendChild(btn);
  
    // Збираємо все до купи
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(heading);
    modalContent.appendChild(paragraph);
    modalContent.appendChild(ul);
    modalContent.appendChild(buttonGroup);
    modal.appendChild(modalContent);
  
    document.body.appendChild(modal);
  });
  