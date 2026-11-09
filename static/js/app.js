(() => {
  const button = document.querySelector('#verify');
  const checkbox = document.querySelector('#checkbox');
  const spinner = document.querySelector('#spinner');
  const cross = document.querySelector('#cross');
  const message = document.querySelector('#verify-message');
  const errorBox = document.querySelector('#error-box');
  const attemptsLabel = document.querySelector('#attempts');
  const requestId = document.querySelector('#request-id');
  const globalDenied = document.querySelector('#global-denied');
  let attempts = 0;
  let busy = false;

  const makeRequestId = () => `CF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  requestId.textContent = makeRequestId();

  button.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    button.disabled = true;
    errorBox.classList.add('hidden');
    cross.classList.add('hidden');
    spinner.classList.remove('hidden');
    checkbox.classList.add('is-thinking', 'border-brand');
    message.textContent = 'Menselijkheid analyseren…';

    window.setTimeout(() => {
      attempts += 1;
      spinner.classList.add('hidden');
      cross.classList.remove('hidden');
      checkbox.classList.remove('is-thinking', 'border-brand');
      checkbox.classList.add('border-alert', 'bg-red-50');
      message.textContent = attempts === 1 ? 'Dat was verdacht menselijk' : 'Nog steeds menselijk. Helaas.';
      attemptsLabel.textContent = `${attempts} mislukte ${attempts === 1 ? 'poging' : 'pogingen'}`;
      requestId.textContent = makeRequestId();
      errorBox.classList.remove('hidden');
      errorBox.classList.remove('is-shaking');
      void errorBox.offsetWidth;
      errorBox.classList.add('is-shaking');
      const current = Number(globalDenied.textContent.replaceAll('.', ''));
      globalDenied.textContent = new Intl.NumberFormat('nl-NL').format(current + 1);

      window.setTimeout(() => {
        button.disabled = false;
        busy = false;
      }, 450);
    }, 1100);
  });
})();
