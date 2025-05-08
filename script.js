const form = document.getElementById('booking-form');
const messageBox = document.getElementById('form-message');
const cryptoSection = document.getElementById('crypto-section');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('input[type="text"]').value.trim();
  const checkIn = document.querySelectorAll('input[type="date"]')[0].value;
  const checkOut = document.querySelectorAll('input[type="date"]')[1].value;
  const roomType = document.getElementById('room-type').value;
  const paymentMethod = document.getElementById('payment-method').value;

  messageBox.className = 'message';
  messageBox.textContent = '';
  cryptoSection.style.display = 'none';

  if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
    messageBox.className = 'message error';
    messageBox.textContent = 'Ошибка: дата выезда должна быть позже даты заезда.';
    return;
  }

  if (name && checkIn && checkOut && roomType && paymentMethod) {
    messageBox.className = 'message success';
    if (paymentMethod === 'crypto') {
      const widget = document.querySelector('vue-widget');
      widget.setAttribute('order_id', `ORDER_${Date.now()}`);
      messageBox.textContent = 'Бронирование успешно! Перейдите к оплате через CryptoCloud.';
      cryptoSection.style.display = 'block';
    } else {
      messageBox.textContent = 'Бронирование успешно! Перейдите к оплате банковской картой.';
    }
  } else {
    messageBox.className = 'message error';
    messageBox.textContent = 'Ошибка: заполните все обязательные поля.';
  }
});
