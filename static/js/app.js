(() => {
  const challengeView = document.querySelector('#challenge-view');
  const errorView = document.querySelector('#error-view');
  const verify = document.querySelector('#verify');
  const checkbox = document.querySelector('#checkbox');
  const spinner = document.querySelector('#spinner');
  const checkmark = document.querySelector('#checkmark');
  const verifyState = document.querySelector('#verify-state');
  const challengeRay = document.querySelector('#challenge-ray');
  const errorRay = document.querySelector('#error-ray');
  const retry = document.querySelector('#retry');
  const revealIp = document.querySelector('#reveal-ip');
  const fakeIp = document.querySelector('#fake-ip');

  const newRayId = () => {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  };

  const resetChallenge = () => {
    const rayId = newRayId();
    challengeRay.textContent = rayId; errorRay.textContent = rayId;
    verify.disabled = false; verifyState.textContent = 'Verify you are human';
    checkbox.classList.remove('loading', 'success'); spinner.classList.add('hidden'); checkmark.classList.add('hidden');
    errorView.classList.add('hidden'); challengeView.classList.remove('hidden');
    document.title = 'Just a moment...'; window.scrollTo(0, 0);
  };

  const showError = () => {
    challengeView.classList.add('hidden'); errorView.classList.remove('hidden');
    document.title = 'Access denied | cloudfake.example'; window.scrollTo(0, 0);
    document.querySelector('#error-title').focus();
  };

  verify.addEventListener('click', () => {
    verify.disabled = true; verifyState.textContent = 'Verifying...';
    checkbox.classList.add('loading'); spinner.classList.remove('hidden');
    window.setTimeout(() => {
      spinner.classList.add('hidden'); checkbox.classList.remove('loading'); checkbox.classList.add('success');
      checkmark.classList.remove('hidden'); verifyState.textContent = 'Success!';
      window.setTimeout(showError, 650);
    }, 1450);
  });

  retry.addEventListener('click', resetChallenge);
  revealIp.addEventListener('click', () => { revealIp.classList.add('hidden'); fakeIp.classList.remove('hidden'); });
  resetChallenge();
})();
