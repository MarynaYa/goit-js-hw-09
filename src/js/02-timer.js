// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// инициализация 
const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

// переменная обозначающая период от которого идет отсчет времени
let selectedTime = null;
updateClockface();

// Таймер
const timer = {
    intervalId: null,
    isActive: false,
start() {
    if(this.isActive) {
        return;
    }
    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedTime - currentTime;
        const time = convertMs(deltaTime);
        updateClockface(time);
   // при 00.00.00.00 периода отсчета чистим таймер
        if (deltaTime <= 0) {
            this.isActive = false;
            clearInterval(this.intervalId);
        }
    }, 1000);
}
}
// слушатель на кнопку Старт
refs.startBtn.addEventListener(`click`, () => {
    timer.start();
});


// объект, который передается вторым аргументом для ф-ции flatpickr
flatpickr(dataTimeInputEl, options);
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    //Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
    onClose(selectedDates) {        
     if (selectedDates[0] < Date.now()) {
    Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
   }
    };
  
// метод принимает день, час, мин., секунді и обновляет значения в интерфейсе
  function updateClockface({ days, hours, minutes, seconds}) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }

  // ф-ция для подсчета значений 
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  //console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  //console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  //console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}