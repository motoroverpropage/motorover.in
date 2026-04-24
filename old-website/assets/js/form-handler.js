// assets/js/form-handler.js

// Configuration
// TODO: Update this URL after deploying the worker
const API_URL = "https://email-worker.motorover.workers.dev/api/submit";
// TODO: Replace with your actual Google reCAPTCHA v3 Site Key
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; 

document.addEventListener('DOMContentLoaded', () => {
    // Inject reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    document.head.appendChild(script);

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
});

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : 'Send';

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
    }

    try {
        // Execute reCAPTCHA
        const token = await new Promise((resolve, reject) => {
            if (typeof grecaptcha === 'undefined') {
                reject('reCAPTCHA not loaded');
                return;
            }
            grecaptcha.ready(() => {
                grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'})
                    .then(resolve)
                    .catch(reject);
            });
        });

        // Map form fields based on known IDs in contactus.html
        const formData = new FormData(form);
        
        // Construct payload for Worker
        // Combining First and Last Name if present
        let fullName = formData.get('viamagus_Name_4827') || '';
        const lastName = formData.get('viamagus_Name_6461');
        if (lastName) fullName += ` ${lastName}`;
        if (!fullName) fullName = formData.get('name') || 'Guest';

        const payload = {
            name: fullName.trim(),
            email: formData.get('viamagus_Email_8804') || formData.get('email'),
            phone: formData.get('viamagus_Phone_5539') || formData.get('phone'),
            message: formData.get('viamagus_Text_Area_1484') || formData.get('message') || '',
            form_type: form.getAttribute('data-form-type') || 'contact',
            recaptcha_token: token
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Thank you! Your message has been sent successfully. Check your email for confirmation.');
            form.reset();
        } else {
            console.error('Server error:', result);
            alert(`Error: ${result.error || 'Failed to send message.'}`);
        }

    } catch (error) {
        console.error('Submission error:', error);
        alert('An unexpected error occurred. Please try again later.');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    }
}
