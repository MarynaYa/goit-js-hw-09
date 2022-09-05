// иницилизация 
const bodyEl = document.querySelector(`body`);
const btnStart = document.querySelector(`[data-start]`);
const btnStop = document.querySelector(`[data-stop]`);

// Вешаем слушателей на кнопки
btnStart.addEventListener(`click`, onClickShowColor);
btnStop.addEventListener(`click`, onClickStopColor);

// вводим переменніе Таймера
let timerId = null;
//let isActive = false;

// ф-ция показа цвета
function onClickShowColor() {
// проверка на активность кнопки: если она активна, то віходим из ф-ции
    //if (isActive) {
      //  return;
  //  }
  //  isActive = true;

  //активировать или неакт кнопки
  btnStart.disabled = true;
  btnStop.disabled = false;

 timerId = setInterval(() => {
   const colorRandom = getRandomHexColor();
    bodyEl.style.background = colorRandom;
}, 1000);

}

// ф-ция Стоп показа
function onClickStopColor() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    
clearInterval(timerId);
//isActive = false;
}

//генерация случайного цвета
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }