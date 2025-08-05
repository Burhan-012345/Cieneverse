// admin.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if admin account exists
    const adminAccount = localStorage.getItem('adminAccount');
    
    // If no admin account exists, show create account form
    if (!adminAccount) {
        showCreateAccountForm();
    } else {
        // Check if we're coming from a redirect (like after account creation)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('from') === 'create') {
            showLoginForm();
            showNotification('Account created successfully! Please login.', 'success');
        }
    }

    // Login form submission
    const loginForm = document.querySelector('#login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value.trim();
            const loginButton = document.querySelector('#login-form button[type="submit"]');
            const originalLoginText = loginButton.innerHTML;
            
            // Validate inputs
            if (!username || !password) {
                showNotification('Please enter both username and password', 'error');
                return;
            }
            
            // Show loading state
            loginButton.disabled = true;
            loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            
            const adminData = JSON.parse(localStorage.getItem('adminAccount'));
            
            // Simulate network delay
            setTimeout(() => {
                if (adminData && adminData.username === username && adminData.password === password) {
                    // Successful login - redirect to dashboard
                    showNotification('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'adashboard.html';
                    }, 1500);
                } else {
                    showNotification('Invalid username or password', 'error');
                    // Clear password field and reset button
                    document.getElementById('login-password').value = '';
                    loginButton.disabled = false;
                    loginButton.innerHTML = originalLoginText;
                }
            }, 1000);
        });
    }

    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForgotPasswordForm();
        });
    }

    // Back to login link
    const backToLoginLink = document.getElementById('back-to-login');
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }

    // Reset password form submission
    const resetPasswordForm = document.getElementById('reset-password-form');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const adminId = document.getElementById('admin-id').value.trim();
            const newPassword = document.getElementById('new-password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();
            const resetButton = document.querySelector('#reset-password-form button[type="submit"]');
            const originalResetText = resetButton.innerHTML;
            
            // Hardcoded admin ID (as requested)
            const HARDCODED_ADMIN_ID = 'ADMIN123';
            
            if (!adminId || !newPassword || !confirmPassword) {
                showNotification('Please fill all fields', 'error');
                return;
            }
            
            if (adminId !== HARDCODED_ADMIN_ID) {
                showNotification('Invalid Admin ID', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (newPassword.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Show loading state
            resetButton.disabled = true;
            resetButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resetting password...';
            
            // Simulate network delay
            setTimeout(() => {
                const adminData = JSON.parse(localStorage.getItem('adminAccount'));
                if (adminData) {
                    adminData.password = newPassword;
                    localStorage.setItem('adminAccount', JSON.stringify(adminData));
                    showNotification('Password updated successfully', 'success');
                    setTimeout(() => {
                        showLoginForm();
                        // Clear form fields and reset button
                        resetPasswordForm.reset();
                        resetButton.disabled = false;
                        resetButton.innerHTML = originalResetText;
                    }, 1500);
                } else {
                    showNotification('No admin account found. Please create an account first.', 'error');
                    showCreateAccountForm();
                    resetButton.disabled = false;
                    resetButton.innerHTML = originalResetText;
                }
            }, 1000);
        });
    }

    // Create account form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('signup-username').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value.trim();
            const confirmPassword = document.getElementById('signup-confirm-password').value.trim();
            const signupButton = document.querySelector('#signup-form button[type="submit"]');
            const originalSignupText = signupButton.innerHTML;
            
            // Validate inputs
            if (!username || !email || !password || !confirmPassword) {
                showNotification('Please fill all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Simple email validation
            if (!email.includes('@') || !email.includes('.')) {
                showNotification('Please enter a valid email', 'error');
                return;
            }
            
            // Show loading state
            signupButton.disabled = true;
            signupButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            
            // Simulate network delay
            setTimeout(() => {
                const adminData = {
                    username,
                    email,
                    password
                };
                
                localStorage.setItem('adminAccount', JSON.stringify(adminData));
                showNotification('Account created successfully! Redirecting to dashboard...', 'success');
                
                // Redirect to dashboard after successful account creation
                setTimeout(() => {
                    window.location.href = 'adashboard.html';
                    signupForm.reset();
                    signupButton.disabled = false;
                    signupButton.innerHTML = originalSignupText;
                }, 1500);
            }, 1000);
        });
    }
});

/**
 * Toggle password visibility
 * @param {string} inputId - The ID of the password input field
 * @param {HTMLElement} icon - The eye icon element
 */
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

/**
 * Show the login form and hide others
 */
function showLoginForm() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('forgot-password-form').classList.add('hidden');
    document.getElementById('create-account-form').classList.add('hidden');
    // Clear any existing notifications
    clearNotifications();
}

/**
 * Show the forgot password form and hide others
 */
function showForgotPasswordForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('forgot-password-form').classList.remove('hidden');
    document.getElementById('create-account-form').classList.add('hidden');
    clearNotifications();
}

/**
 * Show the create account form and hide others
 */
function showCreateAccountForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('forgot-password-form').classList.add('hidden');
    document.getElementById('create-account-form').classList.remove('hidden');
    clearNotifications();
}

/**
 * Show a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('success' or 'error')
 */
function showNotification(message, type) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    notification.appendChild(icon);
    notification.appendChild(document.createTextNode(message));
    
    container.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

/**
 * Clear all notifications
 */
function clearNotifications() {
    const container = document.getElementById('notification-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}