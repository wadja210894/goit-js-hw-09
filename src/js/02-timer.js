import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datetimeValue = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

let timerInterval = null;

startButton.addEventListener('click', startTimer);


function startTimer() {    
    timerInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;  
    datetimeValue.disabled = true;
};

function updateTimer() {    
    const remainingTime = new Date(datetimeValue.value) - new Date();    

    if (remainingTime < 0) {
        clearInterval(timerInterval);
        startButton.disabled = true;
        datetimeValue.disabled = false;
        Notiflix.Report.info('Info',
            'Timer complete. Choose a date.',
            'Ok');
        return;
    }
    const { days, hours, minutes, seconds } = addLeadingZero(convertMs(remainingTime));

    daysField.textContent = days;
    hoursField.textContent = hours;
    minutesField.textContent = minutes;
    secondsField.textContent = seconds;
};



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const now = new Date();
        if (selectedDate < now) {
            Notiflix.Report.failure('Fail',
                'Please choose a date in the future',
                'Try again');        
        startButton.disabled = true;
      } else {
            Notiflix.Report.success('Success',
                'The selected date is in the future. Click Start',
                'Lets go!');
        startButton.disabled = false;        
      }
    },
};

flatpickr(datetimeValue, options);

function convertMs(ms) {    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    
    const days = Math.floor(ms / day);    
    const hours = Math.floor((ms % day) / hour);    
    const minutes = Math.floor(((ms % day) % hour) / minute);    
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  if (days <= 99) {
    days = days.toString().padStart(2, '0');
  } else {
    days = days.toString().padStart(1);
  }
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    return {days, hours, minutes, seconds};
    };