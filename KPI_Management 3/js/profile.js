// Profile management related functions

/**
 * Handle profile update form submission
 */
function handleProfileUpdate() {
    const profileForm = document.getElementById('profile-form');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, this would update profile information via API
            alert('Profile updated successfully!');
        });
    }
}

/**
 * Handle account deactivation
 */
function handleAccountDeactivation() {
    const deactivateBtn = document.getElementById('deactivate-account');
    
    if (deactivateBtn) {
        deactivateBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
                // In a real app, this would be an API call
                // For demo purposes, just show a message
                alert('Account deactivation demonstrated. In a real system, your account would be deactivated now.');
            }
        });
    }
}

/**
 * Handle password change
 */
function handlePasswordChange() {
    const passwordForm = document.getElementById('change-password-form');
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            
            // Validate password match
            if (newPassword !== confirmNewPassword) {
                alert('New passwords do not match!');
                return;
            }
            
            // In a real app, this would validate and update password via API
            alert('Password changed successfully!');
            
            // Reset form
            passwordForm.reset();
        });
    }
}

/**
 * Initialize profile functionality
 */
function initProfile() {
    // Only run on profile page
    if (!window.location.pathname.includes('profile.html')) {
        return;
    }
    
    // Setup profile form handlers
    handleProfileUpdate();
    handleAccountDeactivation();
    handlePasswordChange();
}

// Run on page load
document.addEventListener('DOMContentLoaded', initProfile);