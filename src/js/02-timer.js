import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// console.log(Notify);

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let timerId = null;
let currentDate = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    currentDate = new Date();
    if (selectedDate < currentDate) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', startTimer);

function startTimer() {
  btnStart.disabled = true;
  timerId = setInterval(() => {
    currentDate = new Date();
    const differensTime = selectedDate.getTime() - currentDate.getTime();
    const convertedTime = convertMs(differensTime);
    days.innerHTML = convertedTime.days;
    hours.innerHTML = convertedTime.hours;
    minutes.innerHTML = convertedTime.minutes;
    seconds.innerHTML = convertedTime.seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addZero(Math.floor(ms / day));
  const hours = addZero(Math.floor((ms % day) / hour));
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return String(value).padStart(2, '0');
}
