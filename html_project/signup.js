document.addEventListener('DOMContentLoaded', function() {
    const sendOTPButton = document.getElementById('send-otp');
    const verifyOTPButton = document.getElementById('verify-otp');
    const signUpButton = document.getElementById('sign-up');
    const otpContainer = document.querySelector('.otp-container');

    sendOTPButton.addEventListener('click', function() {
        // Simulate OTP sent
        console.log('OTP sent');

        // Show OTP input field
        otpContainer.style.display = 'block';
        signUpButton.style.display = 'inline-block';
        sendOTPButton.style.display = 'none';
    });

    verifyOTPButton.addEventListener('click', function() {
        // Simulate OTP verification
        console.log('OTP verified');

        // Hide OTP input field after successful verification
        otpContainer.style.display = 'none';
    });

    signUpButton.addEventListener('click', function() {
        // Simulate form submission
        console.log('Form submitted');

        // You can add your form submission logic here
    });
});
