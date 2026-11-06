// Early-Access & ClearSay Form Handling (Aurora API + Netlify Forms Fallback, Null-Safe)
(function () {
    function handleSignupSubmit(e) {
        const form = e.currentTarget;
        e.preventDefault();

        const nameEl = form.querySelector('input[name="name"]');
        const emailEl = form.querySelector('input[name="email"], input[type="email"]');
        const interestEl = form.querySelector('select[name="interest"]');
        const formNameEl = form.querySelector('input[name="form-name"]');

        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const interest = interestEl ? interestEl.value : '';
        const formName = (formNameEl && formNameEl.value) || form.getAttribute('name') || 'early-access';

        const payload = { name: name, email: email, interest: interest || formName, form_name: formName };

        // Attempt Aurora backend endpoint first; fall back to Netlify Forms static POST
        fetch('/api/clearplus/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(function (res) {
            if (!res.ok) throw new Error('Fallback to Netlify static form');
            return res.json();
        }).catch(function () {
            try {
                const formData = new FormData(form);
                if (!formData.get('form-name')) formData.append('form-name', formName);
                return fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });
            } catch (_err) {
                return null;
            }
        }).finally(function () {
            form.style.display = 'none';
            const successEl = document.getElementById('cs-success') ||
                document.getElementById('success-msg') ||
                (form.parentElement && form.parentElement.querySelector('.success-msg, [data-signup-success]'));
            if (successEl) {
                successEl.classList.remove('hidden');
                successEl.style.display = 'block';
            }
        });
    }

    const forms = document.querySelectorAll('#signup-form, #cs-form, form[name="early-access"], form[name="uh-early-access"], form[name="clearsay-access"]');
    forms.forEach(function (f) {
        f.addEventListener('submit', handleSignupSubmit);
    });

    // Smooth scrolling for in-page navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
