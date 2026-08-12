// Rezervacijski obrazec — pošlje povpraševanje neposredno na e-pošto kavarne
// prek Formspree (enako kot kontaktni obrazec na strani Kavarne Visoko).

const statusEl = document.getElementById('bookingStatus');

function showStatus(msg, ok) {
  statusEl.textContent = msg;
  statusEl.className = 'booking-status show ' + (ok ? 'ok' : 'err');
}

document.getElementById('submitBooking')?.addEventListener('click', async () => {
  const name = document.getElementById('r-name').value.trim();
  const email = document.getElementById('r-email').value.trim();
  const purpose = document.getElementById('r-purpose').value;
  const note = document.getElementById('r-note').value.trim();

  if (!name || !email) {
    showStatus('Prosimo, izpolnite ime in e-naslov.', false);
    return;
  }

  const submitBtn = document.getElementById('submitBooking');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Pošiljam …';

  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Nova rezervacija — ${name}`,
        'Ime in priimek': name,
        'E-naslov': email,
        'Namen rezervacije': purpose,
        Sporočilo: note || '/',
      }),
    });
    if (res.ok) {
      showStatus('Rezervacija oddana! Potrditev prejmete po e-pošti.', true);
      document.getElementById('r-name').value = '';
      document.getElementById('r-email').value = '';
      document.getElementById('r-note').value = '';
    } else {
      throw new Error('Formspree napaka');
    }
  } catch (e) {
    showStatus('Rezervacije trenutno ni bilo mogoče oddati. Pokličite nas na 04 512 30 47.', false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Pošlji rezervacijo';
  }
});
