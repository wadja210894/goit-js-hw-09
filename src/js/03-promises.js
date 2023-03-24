import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', SubmitHandler);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });  
};

function SubmitHandler(event) {
  event.preventDefault();

  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

   if (amount <= 0 || step < 0 || delay < 0) {
    return Notiflix.Report.failure('Alert', 'Field values must be > 0', 'Try again');
  }

  for (let i = 0; i < Number(amount); i += 1) {
    createPromise(i + 1, Number(delay) + Number(step) * i)
      .then(value => {
        Notiflix.Notify.success(value);
      })
      .catch(error => {
        Notiflix.Notify.failure(error);
      });
  }
};
