// Authentication related functions

/**
 * Handle user login
 */
function handleLogin() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple authentication against sample data
            // In a real app, this would be an API call with proper security
            const user = sampleData.users.find(u => 
                u.username === username && u.password === password
            );
            
            if (user) {
                // Store user info in sessionStorage
                // In a real app, this would be a token-based system
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password!');
            }
        });
    }
}

/**
 * Handle user registration
 */
function handleRegistration() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Check if username already exists
            if (sampleData.users.some(u => u.username === username)) {
                alert('Username already exists!');
                return;
            }
            
            // In a real app, this would send data to an API
            // For demo purposes, we'll just show success message
            alert('Registration successful! You can now login.');
            
            // Switch back to login form
            document.getElementById('login-card').classList.remove('d-none');
            document.getElementById('register-card').classList.add('d-none');
            
            // Clear form
            registerForm.reset();
        });
    }
}

/**
 * Setup toggle between login and registration forms
 */
function setupAuthenticationForms() {
    const registerLink = document.getElementById('register-link');
    const backToLoginBtn = document.getElementById('back-to-login');
    
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login-card').classList.add('d-none');
            document.getElementById('register-card').classList.remove('d-none');
        });
    }
    
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', function() {
            document.getElementById('register-card').classList.add('d-none');
            document.getElementById('login-card').classList.remove('d-none');
        });
    }
}

/**
 * Initialize authentication related functionality
 */
function initAuth() {
    // Only run on index page
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        return;
    }
    
    setupAuthenticationForms();
    handleLogin();
    handleRegistration();
    
    // Check if user is already logged in
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initAuth);