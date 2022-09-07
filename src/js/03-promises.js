import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector(`.form`);
let delayEl = document.querySelector('[name=delay]');
let stepEl = document.querySelector('[name=step]');
let amountEl = document.querySelector('[name=amount]');

formEl.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  delayEl = Number(event.currentTarget.delay.value);
  stepEl = Number(event.currentTarget.step.value);
  amountEl = Number(event.currentTarget.amount.value);
  //перебираем значения ввода
for (let i =1; i <= amountEl; i++) { 
   // ф-ция возвращала один промиc
   createPromise(i, delayEl)
   .then(({ position, delay }) => {
     setTimeout(() => {
       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
     }, delay);
   })
   .catch(({ position, delay }) => {
     setTimeout(() => {
       Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
     }, delay);
   });
   delayEl += stepEl;
}
}
// ф-ция при сабмите вызывается столько раз, сколько ввели в поле amount
function createPromise(position, delay) {
  return new Promise((resolve, reject) =>
   {    setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
 
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    });
  })
}
