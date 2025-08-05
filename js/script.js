const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const forgotPasswordLink = document.querySelector('.forgot-password-link');
const returnToLoginLinks = document.querySelectorAll('.login-link');

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "Admin@1234",
    email: "admin@cineverse.com",
    userId: "ADMIN-1001"
};

// Toggle between forms
registerLink.onclick = () => {
    wrapper.classList.add('active');
    wrapper.classList.remove('forgot-active');
    generateUserId();
};

loginLink.onclick = () => {
    wrapper.classList.remove('active');
    wrapper.classList.remove('forgot-active');
};

forgotPasswordLink?.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.add('forgot-active');
    wrapper.classList.remove('active');
});

returnToLoginLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        wrapper.classList.remove('active');
        wrapper.classList.remove('forgot-active');
    });
});

// Generate unique user ID
function generateUserId() {
    const prefix = "USER";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const userId = `${prefix}-${randomNum}`;
    const userIdInput = document.querySelector('.form-box.register .userid-input');
    userIdInput.value = userId;
    userIdInput.parentElement.classList.add('userid-box');
    return userId;
}

// Password toggle functionality
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('bxs-hide');
        this.classList.toggle('bxs-show');
    });
});

// Show alert message
function showAlert(message, type = 'success') {
    const alertContainer = document.querySelector('.alert-container');
    const alertMessage = alertContainer.querySelector('.alert-message');
    
    alertMessage.querySelector('.alert-text').textContent = message;
    alertMessage.className = `alert-message ${type}`;
    
    alertContainer.style.display = 'block';
    alertMessage.style.display = 'flex';
    alertMessage.classList.remove('fade-out');
    
    setTimeout(() => {
        hideAlert();
    }, 5000);
}

// Hide alert
function hideAlert() {
    const alertContainer = document.querySelector('.alert-container');
    const alertMessage = document.querySelector('.alert-message');
    alertMessage.classList.add('fade-out');
    
    setTimeout(() => {
        alertContainer.style.display = 'none';
        alertMessage.style.display = 'none';
    }, 500);
}

// Close alert
document.querySelector('.alert-close')?.addEventListener('click', hideAlert);

// Validation functions
function validateUsername(username) {
    if (username.length < 4) return 'Username must be at least 4 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers and underscores';
    return '';
}

function validatePassword(password) {
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    return '';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Please enter a valid email address';
    return '';
}

function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
}

// Real-time validation
document.querySelectorAll('.username-input').forEach(input => {
    input.addEventListener('input', function() {
        const message = validateUsername(this.value);
        const messageElement = this.parentElement.querySelector('.username-message');
        messageElement.textContent = message;
        messageElement.classList.toggle('valid', message === '');
    });
});

document.querySelectorAll('.password-input').forEach(input => {
    input.addEventListener('input', function() {
        const message = validatePassword(this.value);
        const messageElement = this.parentElement.querySelector('.password-message');
        messageElement.textContent = message;
        messageElement.classList.toggle('valid', message === '');
    });
});

document.querySelectorAll('.email-input').forEach(input => {
    input.addEventListener('input', function() {
        const message = validateEmail(this.value);
        const messageElement = this.parentElement.querySelector('.email-message');
        messageElement.textContent = message;
        messageElement.classList.toggle('valid', message === '');
    });
});

document.querySelectorAll('.new-password-input').forEach(input => {
    input.addEventListener('input', function() {
        const message = validatePassword(this.value);
        const messageElement = this.parentElement.querySelector('.new-password-message');
        messageElement.textContent = message;
        messageElement.classList.toggle('valid', message === '');
    });
});

document.querySelectorAll('.confirm-password-input').forEach(input => {
    input.addEventListener('input', function() {
        const newPassword = document.querySelector('.new-password-input')?.value;
        const message = validateConfirmPassword(newPassword, this.value);
        const messageElement = this.parentElement.querySelector('.confirm-password-message');
        messageElement.textContent = message;
        messageElement.classList.toggle('valid', message === '');
    });
});

// Store credentials
function storeCredentials(userId, username, password, email) {
    if (username === ADMIN_CREDENTIALS.username) return false;
    
    const userData = {
        userId: userId,
        username: username,
        password: password,
        email: email,
        isAdmin: false,
        joinDate: new Date().toISOString()
    };
    
    const existingUsers = JSON.parse(localStorage.getItem('cineverseUsers')) || [];
    
    if (existingUsers.some(user => user.username === username || user.email === email)) {
        showAlert('Username or email already exists', 'error');
        return false;
    }
    
    existingUsers.push(userData);
    localStorage.setItem('cineverseUsers', JSON.stringify(existingUsers));
    
    const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];
    adminUsers.push({
        id: adminUsers.length > 0 ? Math.max(...adminUsers.map(u => u.id)) + 1 : 1,
        userId: userId,
        name: username,
        email: email,
        role: 'user',
        status: 'active',
        joined: new Date().toISOString().split('T')[0],
        avatar: `https://source.unsplash.com/random/100x100/?portrait,${Math.random() > 0.5 ? 'man' : 'woman'}`
    });
    localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
    
    updateAdminDashboardStats();
    return true;
}

// Retrieve credentials
function getStoredCredentials() {
    const storedData = localStorage.getItem('cineverseUsers');
    return storedData ? JSON.parse(storedData) : null;
}

// Find user
function findUserByIdAndUsername(userId, username) {
    const users = getStoredCredentials() || [];
    return users.find(user => user.userId === userId && user.username === username);
}

// Check if username exists
function usernameExists(username) {
    const users = getStoredCredentials() || [];
    return users.some(user => user.username === username);
}

// Update password
function updateUserPassword(userId, newPassword) {
    const users = getStoredCredentials() || [];
    const userIndex = users.findIndex(user => user.userId === userId);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('cineverseUsers', JSON.stringify(users));
        return true;
    }
    return false;
}

// Button loading states
function showButtonLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    btnText.style.opacity = '0';
    btnLoader.classList.remove('hidden');
}

function hideButtonLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    btnText.style.opacity = '1';
    btnLoader.classList.add('hidden');
}

// Auto-fill login form (only for remember me functionality)
function autoFillLoginForm() {
    // Check if remember me was checked
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (!rememberMe) return;

    const credentials = getStoredCredentials();
    if (credentials && credentials.length > 0) {
        const lastUser = credentials[credentials.length - 1];
        const loginForm = document.querySelector('.form-box.login form');
        if (loginForm) {
            const usernameInput = loginForm.querySelector('.username-input');
            const passwordInput = loginForm.querySelector('.password-input');
            const rememberMeCheckbox = loginForm.querySelector('.remember-me');
            
            if (usernameInput) usernameInput.value = lastUser.username;
            if (passwordInput) passwordInput.value = lastUser.password;
            if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
            
            if (usernameInput) usernameInput.dispatchEvent(new Event('input'));
            if (passwordInput) passwordInput.dispatchEvent(new Event('input'));
        }
    }
}

// Fill register form with login credentials
function fillRegisterForm(username, password) {
    wrapper.classList.add('active');
    wrapper.classList.remove('forgot-active');
    generateUserId();
    
    const registerForm = document.querySelector('.form-box.register form');
    if (registerForm) {
        const usernameInput = registerForm.querySelector('.username-input');
        const passwordInput = registerForm.querySelector('.password-input');
        
        if (usernameInput) usernameInput.value = username;
        if (passwordInput) passwordInput.value = password;
        
        if (usernameInput) usernameInput.dispatchEvent(new Event('input'));
        if (passwordInput) passwordInput.dispatchEvent(new Event('input'));
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.alert-container').style.display = 'none';
    
    // Clear all form fields on page load
    document.querySelectorAll('input').forEach(input => {
        if (input.type !== 'checkbox' && input.type !== 'submit') {
            input.value = '';
        }
    });
    
    // Only auto-fill if remember me was checked
    autoFillLoginForm();
});

// Form submissions
document.querySelector('.form-box.register form').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitButton = this.querySelector('button[type="submit"]');
    showButtonLoading(submitButton);
    
    const userId = this.querySelector('.userid-input').value;
    const username = this.querySelector('.username-input').value;
    const password = this.querySelector('.password-input').value;
    const email = this.querySelector('.email-input').value;
    
    if (username === ADMIN_CREDENTIALS.username) {
        const messageElement = this.querySelector('.username-message');
        messageElement.textContent = 'Username not available';
        messageElement.classList.remove('valid');
        showAlert('Username not available', 'error');
        hideButtonLoading(submitButton);
        return;
    }
    
    const usernameMessage = validateUsername(username);
    const passwordMessage = validatePassword(password);
    const emailMessage = validateEmail(email);
    
    const usernameMessageElement = this.querySelector('.username-message');
    const passwordMessageElement = this.querySelector('.password-message');
    const emailMessageElement = this.querySelector('.email-message');
    
    usernameMessageElement.textContent = usernameMessage;
    passwordMessageElement.textContent = passwordMessage;
    emailMessageElement.textContent = emailMessage;
    
    if (!usernameMessage && !passwordMessage && !emailMessage) {
        setTimeout(() => {
            const storedSuccessfully = storeCredentials(userId, username, password, email);
            if (storedSuccessfully) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify({
                    userId: userId,
                    username: username,
                    isAdmin: false,
                    email: email
                }));
                
                showAlert('Registration successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'udashboard.html';
                }, 1500);
                
                this.reset();
                usernameMessageElement.textContent = '';
                passwordMessageElement.textContent = '';
                emailMessageElement.textContent = '';
                generateUserId();
            }
            hideButtonLoading(submitButton);
        }, 1500);
    } else {
        showAlert('Please fix the errors in the form', 'error');
        hideButtonLoading(submitButton);
    }
});

document.querySelector('.form-box.login form').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitButton = this.querySelector('button[type="submit"]');
    showButtonLoading(submitButton);
    
    const username = this.querySelector('.username-input').value;
    const password = this.querySelector('.password-input').value;
    const rememberMe = this.querySelector('.remember-me')?.checked || false;
    
    // Store remember me preference
    localStorage.setItem('rememberMe', rememberMe.toString());
    
    const existingError = this.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    setTimeout(() => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                userId: ADMIN_CREDENTIALS.userId,
                username: ADMIN_CREDENTIALS.username,
                isAdmin: true,
                email: ADMIN_CREDENTIALS.email
            }));
            
            showAlert('Admin login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1500);
            hideButtonLoading(submitButton);
            return;
        }
        
        const storedCredentials = getStoredCredentials();
        const user = storedCredentials?.find(u => u.username === username && u.password === password);
        
        if (user) {
            const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];
            const adminUser = adminUsers.find(u => u.userId === user.userId);
            
            if (adminUser && adminUser.status === 'banned') {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Your account has been banned. Please contact support.';
                errorMessage.style.color = 'var(--errorRed)';
                errorMessage.style.marginTop = '10px';
                errorMessage.style.textAlign = 'center';
                
                this.appendChild(errorMessage);
                showAlert('Your account has been banned', 'error');
                hideButtonLoading(submitButton);
                return;
            }
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                userId: user.userId,
                username: user.username,
                isAdmin: false,
                email: user.email
            }));
            
            showAlert('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'udashboard.html';
            }, 1500);
        } else {
            // Check if username exists
            const usernameExists = storedCredentials?.some(u => u.username === username);
            
            if (!usernameExists) {
                showAlert('New user detected. Redirecting to signup...', 'info');
                setTimeout(() => {
                    fillRegisterForm(username, password);
                    hideButtonLoading(submitButton);
                }, 1500);
            } else {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Invalid username or password';
                errorMessage.style.color = 'var(--errorRed)';
                errorMessage.style.marginTop = '10px';
                errorMessage.style.textAlign = 'center';
                
                this.appendChild(errorMessage);
                showAlert('Invalid username or password', 'error');
                hideButtonLoading(submitButton);
            }
        }
    }, 1500);
});

document.querySelector('.form-box.forgot-password form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitButton = this.querySelector('button[type="submit"]');
    showButtonLoading(submitButton);
    
    const userId = this.querySelector('.userid-input').value;
    const username = this.querySelector('.username-input').value;
    const newPassword = this.querySelector('.new-password-input').value;
    const confirmPassword = this.querySelector('.confirm-password-input').value;
    
    const existingError = this.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    setTimeout(() => {
        const passwordMessage = validatePassword(newPassword);
        const confirmPasswordMessage = validateConfirmPassword(newPassword, confirmPassword);
        
        const passwordMessageElement = this.querySelector('.new-password-message');
        const confirmPasswordMessageElement = this.querySelector('.confirm-password-message');
        
        passwordMessageElement.textContent = passwordMessage;
        confirmPasswordMessageElement.textContent = confirmPasswordMessage;
        
        if (!passwordMessage && !confirmPasswordMessage) {
            const user = findUserByIdAndUsername(userId, username);
            
            if (user) {
                const updated = updateUserPassword(userId, newPassword);
                if (updated) {
                    showAlert('Password reset successfully! You can now login with your new password.', 'success');
                    wrapper.classList.remove('forgot-active');
                    this.reset();
                    passwordMessageElement.textContent = '';
                    confirmPasswordMessageElement.textContent = '';
                } else {
                    showAlert('Failed to update password. Please try again.', 'error');
                }
            } else {
                showAlert('User ID and username combination not found', 'error');
            }
        } else {
            showAlert('Please fix the errors in the form', 'error');
        }
        hideButtonLoading(submitButton);
    }, 1500);
});

// Clear form errors
[registerLink, loginLink, forgotPasswordLink, ...returnToLoginLinks].forEach(link => {
    link?.addEventListener('click', () => {
        document.querySelectorAll('.validation-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    });
});

// Check login status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Only redirect if not on the login page and actually logged in
    if (isLoggedIn === 'true' && !window.location.pathname.includes('user-login.html')) {
        if (currentUser?.isAdmin) {
            // Only redirect to admin.html if we're not already there
            if (!window.location.pathname.includes('admin.html')) {
                window.location.href = 'admin.html';
            }
        } else {
            // Only redirect to index.html if we're not already there
            if (!window.location.pathname.includes('index.html')) {
                window.location.href = 'index.html';
            }
        }
    }
}

// Update admin stats
function updateAdminDashboardStats() {
    const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];
    const adminMovies = JSON.parse(localStorage.getItem('adminMovies')) || [];
    
    const stats = {
        totalUsers: adminUsers.length,
        totalMovies: adminMovies.filter(m => m.status === 'active').length,
        activeViews: Math.floor(Math.random() * 10000)
    };
    
    localStorage.setItem('adminStats', JSON.stringify(stats));
}

// Initialize - removed the immediate checkLoginStatus call
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.alert-container').style.display = 'none';
    
    // Clear all form fields on page load
    document.querySelectorAll('input').forEach(input => {
        if (input.type !== 'checkbox' && input.type !== 'submit') {
            input.value = '';
        }
    });
    
    // Only auto-fill if remember me was checked
    autoFillLoginForm();
});