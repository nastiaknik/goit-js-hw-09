// генератор промісів
// в поля форми користувач буде вводити 1у затримку в мс, крок збільшення затримки для
// кожного промісу після 1ого і к-сть промісів, яку необхідно ств

// 1. на момент сабміту форми викл ф-ю createPromise(position, delay) стільки разів,
// скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу(position),
// що ств, і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step)

// 2. ф-я createPromise повертає 1 проміс, який викон/відхиляється через delay.
// Знач промісу повинен бути об'єкт, в якому будуть властивості position і delay зі знач
// однойменних параметрів. Викор поч код ф-ї для вибору того, що потрібно зробити
// з промісом - виконати або відхилити.
// Для відображення повідомлень викор бібліотеку notiflix.

import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const data = {};
let position = 0;
formEl.addEventListener('submit', onPromiseBtnClick);

function onPromiseBtnClick(event) {
  event.preventDefault();
  collectedFormData(event);
  onStart(data);
}

function collectedFormData(event) {
  let formData = new FormData(event.target);
  formData.forEach((value, name) => {
    data[name] = Number(value);
  });
  return data;
}

function onStart({ delay, step, amount }) {
  position += 1;
  if (position >= amount) {
    return;
  }
  for (let i = 1; i <= amount; i += 1) {
    makePromises(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const random = Math.random() > 0.3;
    setTimeout(() => {
      if (random) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function makePromises(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
