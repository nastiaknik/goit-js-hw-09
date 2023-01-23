// Таймер зворотного відліку до певної дати
// 1. Вибір дати: Метод onClose() з об'єкта параметрів викл щоразу під час закриття ел
// інтерфейсу, який створює flatpickr.у ньому обробляти дату, обрану користувачем.
// Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.
// Якщо користувач вибрав дату в минулому - "Please choose a date in the future".
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
// 2. Відлік часу: Натиск на «Start» скрипт повинен обчислювати раз на сек, скільки часу залишилось до
// вказаної дати, і оновлювати інтерфейс таймера, показуючи 4 цифри: дні, години, хв і сек
// у форматі xx: xx: xx: xx. К-сть днів може складатися з більше, ніж двох цифр!
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.
// 3. Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити - необхідно
// перезавантажити сторінку. Для підрахунку знач викор готову ф-ю convertMs, де ms -
// різниця між кінцевою і поточною датою в мілісекундах.
// 4. Форматування часу: Ф-я convertMs() повертає об'єкт з розрахованим часом, що залишився
// до кінцевої дати. вона не форматує результат! В інтерфейсі таймера треба додавати 0,
// якщо менше 2ох символів. Напиши ф-ю addLeadingZero(value), яка викор метод padStart()
// і перед рендерингом форматує знач. Для повідомлень викор бібліотеку notiflix.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  daysCounter: document.querySelector('[data-days]'),
  hoursCounter: document.querySelector('[data-hours]'),
  minsCounter: document.querySelector('[data-minutes]'),
  secsCounter: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
Notiflix.Notify.warning(
  'Select the end date in the future and click on "Start" button to start a countdown.'
);

refs.startBtn.addEventListener('click', onStartBtnClick);

let deltaTime = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
    } else {
      refs.startBtn.removeAttribute('disabled');
      return selectedDates[0].getTime();
    }
  },
};

const picker = new flatpickr('#datetime-picker', options);

function onStartBtnClick(event) {
  timerId = setInterval(() => {
    deltaTime = picker.selectedDates[0] - new Date(); // Date.now()
    if (deltaTime <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.success(
        'Time is up! Select the end date once again to start a new countdown.'
      );
      return;
    }
    updateClockface(convertMs(deltaTime));
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  updateClockface({ days, hours, minutes, seconds });

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  if (String(value).length <= 2) {
    return String(value).padStart(2, '0');
  } else {
    return String(value);
  }
}
function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysCounter.textContent = `${days}`;
  refs.hoursCounter.textContent = `${hours}`;
  refs.minsCounter.textContent = `${minutes}`;
  refs.secsCounter.textContent = `${seconds}`;
}
