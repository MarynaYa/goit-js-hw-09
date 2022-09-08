import { Notify } from 'notiflix/build/notiflix-notify-aio';
//1. Достучаться до формы
//2. На форму через Сабмит вешаем слушателя ч/з ф-цию, которая получает введенные значения 
//3. Функция: выводим введенные в форму значения
//4. Перебираем значения, которые будут вводится как аргумент для  createPromise, где через установлленый таймаут выйдут сообщения  Notify
//5. Период таймаута и шаг увеличения пеиода устанавливает пользователь
//6. В ф-цию createPromise возвращаем новый Промис

// №1
const formEl = document.querySelector(`.form`);
let delayEl = document.querySelector('[name=delay]');
let stepEl = document.querySelector('[name=step]');
let amountEl = document.querySelector('[name=amount]');
// №2
formEl.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
//  №3
  delayEl = Number(event.currentTarget.delay.value);
  stepEl = Number(event.currentTarget.step.value);
  amountEl = Number(event.currentTarget.amount.value);
  // №4
for (let i =1; i <= amountEl; i++) {   
     createPromise(i, delayEl)   
   .then(({ position, delay }) => {    
       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
     })

   .catch(({ position, delay }) => {   
       Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
     })

   // № 5
   delayEl += stepEl;
}
}
// № 6
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
