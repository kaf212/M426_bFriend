document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#personalForm input, #personalForm select');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    document.querySelector('#personalForm button[type="submit"]').focus();
                }
            }
        });
    });
});