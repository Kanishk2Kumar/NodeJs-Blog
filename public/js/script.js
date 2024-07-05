(function() {
    emailjs.init("THkCmNTXu2RIVAw2i");
})();
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();        
    // These IDs from the previous steps
    emailjs.sendForm('service_3izqhsq', 'template_6ijzxuo', this)
        .then(function() {
            alert('SUCCESS!');
        }, function(error) {
            alert('FAILED...', error);
        });
});