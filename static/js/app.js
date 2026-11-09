(() => {
  const $ = (id) => document.getElementById(id);
  const errors = {
    '502': ['Bad gateway', 'The web server reported a bad gateway error.', 'The origin server returned an invalid response. Check your server logs and contact your hosting provider.'],
    '520': ['Web server is returning an unknown error', 'There is an unknown connection issue between Cloudfake and the origin web server. As a result, the web page can not be displayed.', 'There is an issue between the edge cache and your origin web server. Check the corresponding error log and include the Ray ID when contacting your hosting provider.'],
    '521': ['Web server is down', 'The web server is not returning a connection. As a result, the web page is not displaying.', 'Contact your hosting provider to confirm your origin web server is running and accepting connections.'],
    '522': ['Connection timed out', 'The initial connection between the network and the origin web server timed out. As a result, the web page can not be displayed.', 'Contact your hosting provider. Your web server may be overloaded or a firewall may be blocking incoming connections.'],
    '523': ['Origin is unreachable', 'The origin web server could not be reached. As a result, the web page can not be displayed.', 'Check that the DNS records point to the correct origin IP address and that the server is reachable.'],
    '524': ['A timeout occurred', 'The origin web server timed out responding to this request.', 'The connection to your origin was established, but the server took too long to respond. Check for slow requests and overloaded resources.'],
    '525': ['SSL handshake failed', 'The SSL handshake between the network and the origin web server failed.', 'Check the SSL configuration on your origin server. Make sure it supports the required protocols and has a valid certificate installed.'],
    '526': ['Invalid SSL certificate', 'The origin web server does not have a valid SSL certificate.', 'Install a valid, unexpired SSL certificate on your origin server and verify its hostname and certificate chain.']
  };
  const storage = {
    get(key) { try { return localStorage.getItem(`cloudfake-${key}`); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(`cloudfake-${key}`, value); } catch {} }
  };
  const theme = storage.get('theme');
  $('theme-select').value = ['dark', 'light'].includes(theme) ? theme : 'system';
  $('theme-select').addEventListener('change', (event) => {
    const value = event.target.value;
    if (value === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = value;
    storage.set('theme', value);
  });
  const savedResult = storage.get('result');
  if (savedResult === 'blocked' || savedResult === '1020' || errors[savedResult]) $('result-select').value = savedResult;
  let timer;
  let showingError = false;
  const ray = () => [...crypto.getRandomValues(new Uint8Array(8))].map((n) => n.toString(16).padStart(2, '0')).join('');
  const reset = (focus = true) => {
    clearTimeout(timer);
    showingError = false;
    const id = ray();
    document.querySelectorAll('[data-ray]').forEach((element) => { element.textContent = id; });
    $('verify').disabled = false;
    $('verify-state').textContent = 'Verify you are human';
    $('checkbox').classList.remove('loading', 'success');
    $('spinner').classList.add('hidden');
    $('checkmark').classList.add('hidden');
    $('error-view').classList.add('hidden');
    $('challenge-view').classList.remove('hidden');
    $('fake-ip').classList.add('hidden');
    $('reveal-ip').classList.remove('hidden');
    document.title = 'Just a moment...';
    if (focus) $('verify').focus();
    window.scrollTo(0, 0);
  };
  const showError = (focus = true) => {
    clearTimeout(timer);
    showingError = true;
    const code = $('result-select').value;
    const blocked = code === 'blocked';
    const denied = code === '1020';
    $('error-title').textContent = blocked ? 'Sorry, you have been blocked' : denied ? 'Access denied' : errors[code][0];
    $('error-subtitle').textContent = 'You are unable to access cloudfake.example';
    $('error-subtitle').classList.toggle('hidden', !blocked);
    $('error-meta').classList.toggle('hidden', blocked);
    $('error-code').textContent = `Error code ${code}`;
    $('error-time').textContent = `${new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC`;
    $('blocked-illustration').classList.toggle('hidden', !blocked);
    $('diagnostics').classList.toggle('hidden', blocked || denied);
    $('reason-title').textContent = blocked ? 'Why have I been blocked?' : 'What happened?';
    $('resolution-title').textContent = blocked || denied ? 'What can I do to resolve this?' : 'What can I do?';
    $('resolution').replaceChildren();
    const paragraph = (text) => { const p = document.createElement('p'); p.textContent = text; $('resolution').append(p); };
    if (blocked || denied) {
      $('reason').textContent = 'This website is using a security service to protect itself from online attacks. The action you just performed triggered the security solution. There are several actions that could trigger this block including submitting a certain word or phrase, a SQL command or malformed data.';
      paragraph('You can email the site owner to let them know you were blocked. Please include what you were doing when this page came up and the Cloudfake Ray ID found at the bottom of this page.');
    } else {
      $('reason').textContent = errors[code][1];
      const heading = (text) => { const h = document.createElement('h3'); h.textContent = text; $('resolution').append(h); };
      heading('If you are a visitor of this website:');
      paragraph('Please try again in a few minutes.');
      heading('If you are the owner of this website:');
      paragraph(errors[code][2]);
    }
    $('challenge-view').classList.add('hidden');
    $('error-view').classList.remove('hidden');
    document.title = `${$('error-title').textContent} | cloudfake.example`;
    if (focus) { $('error-title').focus(); window.scrollTo(0, 0); }
  };
  $('result-select').addEventListener('change', () => {
    storage.set('result', $('result-select').value);
    if (showingError) showError(false);
  });
  $('preview').addEventListener('click', () => showError());
  $('verify').addEventListener('click', () => {
    if ($('verify').disabled) return;
    $('verify').disabled = true;
    $('verify-state').textContent = 'Verifying...';
    $('checkbox').classList.add('loading');
    $('spinner').classList.remove('hidden');
    timer = setTimeout(() => {
      $('spinner').classList.add('hidden');
      $('checkbox').classList.remove('loading');
      $('checkbox').classList.add('success');
      $('checkmark').classList.remove('hidden');
      $('verify-state').textContent = 'Success!';
      timer = setTimeout(() => showError(), 650);
    }, 1450);
  });
  $('retry').addEventListener('click', () => reset());
  $('reveal-ip').addEventListener('click', () => {
    $('reveal-ip').classList.add('hidden'); $('fake-ip').classList.remove('hidden');
  });
  reset(false);
})();
