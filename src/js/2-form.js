const formSnapshot = {
  email: '',
  message: '',
};

const FORM_CACHE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');

function restoreFormProgress() {
  const cachedData = localStorage.getItem(FORM_CACHE_KEY);

  if (!cachedData) return;

  const parsedData = JSON.parse(cachedData);

  formSnapshot.email = parsedData.email || '';
  formSnapshot.message = parsedData.message || '';

  feedbackForm.elements.email.value = formSnapshot.email;
  feedbackForm.elements.message.value = formSnapshot.message;
}

restoreFormProgress();

feedbackForm.addEventListener('input', event => {
  const { name, value } = event.target;

  formSnapshot[name] = value.trim();

  localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(formSnapshot));
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  if (formSnapshot.email === '' || formSnapshot.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formSnapshot);

  localStorage.removeItem(FORM_CACHE_KEY);

  formSnapshot.email = '';
  formSnapshot.message = '';

  feedbackForm.reset();
});
