// scripts/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    const buttonIds = ['continueButton', 'continueButton2', 'continueButton3'];
  
    buttonIds.forEach(id => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener('click', () => {
          window.location.href = 'bussiness-portal.html';
        });
      }
    });
  });
  