document.addEventListener('DOMContentLoaded', function() {
    // Retrieve username from localStorage (assuming you store it after sign-in)
    const username = localStorage.getItem('username');
  
    // Update the welcome message with the username
    const usernameSpan = document.getElementById('username');
    usernameSpan.textContent = username || 'Guest'; // Default to 'Guest' if username is not available
  
  });
  