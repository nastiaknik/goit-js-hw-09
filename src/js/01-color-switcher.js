// Перемикач кольорів

// після натискання кнопки «Start», раз на сек змінює колір фону <body> на випадкове знач
// викор інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

const COLOR_SWITCHER_DELAY = 1000;
let intervalId = null;
let isActive = false;
stopBtn.setAttribute('disabled', true);

function onStartBtnClick(event) {
  if (isActive) {
    return;
  }
  document.body.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, COLOR_SWITCHER_DELAY);
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
  isActive = true;
}

function onStopBtnClick(event) {
  if (!isActive) {
    return;
  }

  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
  clearInterval(intervalId);
  document.body.style.backgroundColor = 'white';
  isActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
