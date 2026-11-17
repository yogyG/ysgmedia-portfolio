document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusElement = document.getElementById('form-status');
  const submitButton = document.getElementById('submit-button');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Change button state
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    statusElement.textContent = ''; // Clear previous messages
    statusElement.style.color = 'inherit';

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/moeqlkaw', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        statusElement.textContent = 'Thanks for your request! We will get back to you shortly.';
        statusElement.style.color = '#22c55e'; // Green for success
        form.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          statusElement.textContent = data.errors.map(error => error.message).join(', ');
        } else {
          statusElement.textContent = 'Oops! There was a problem submitting your form.';
        }
        statusElement.style.color = '#ef4444'; // Red for error
      }
    } catch (error) {
      statusElement.textContent = 'Oops! There was a problem submitting your form.';
      statusElement.style.color = '#ef4444'; // Red for error
    } finally {
      // Restore button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });
});
