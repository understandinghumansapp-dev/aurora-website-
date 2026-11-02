document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name     = this.querySelector('input[name="name"]').value.trim();
  const email    = this.querySelector('input[name="email"]').value.trim();
  const interest = this.querySelector('select[name="interest"]').value;

  const mailto = 'mailto:understandinghumansapp@gmail.com'
    + '?subject=' + encodeURIComponent('Aurora Early Tester Signup — ' + name)
    + '&body='    + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nTesting Focus: ' + interest + '\n\nI would like early tester access to Aurora OS.');

  window.location.href = mailto;

  this.style.display = 'none';
  document.getElementById('success-msg').style.display = 'block';
});
