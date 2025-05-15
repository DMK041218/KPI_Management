// Common utility functions used across multiple pages

// Default demo user (for simplicity without login)
const demoUser = {
    id: 1,
    username: 'staff_user',
    fullName: 'Demo User',
    department: 'IT',
    position: 'Developer',
    phone: '123-456-7890',
    joinedDate: '2023-01-15',
    role: 'staff'
};

/**
 * Get current user info - always returns the demo user
 * @returns {Object} User information
 */
function getCurrentUser() {
    return demoUser;
}

/**
 * Setup modals for the application
 */
function setupModals() {
    // If Bootstrap modals exist on the page, initialize them
    if (typeof bootstrap !== 'undefined') {
        // Set up any modals that might be on the page
        const modalElements = document.querySelectorAll('.modal');
        modalElements.forEach(modalEl => {
            new bootstrap.Modal(modalEl);
        });
    }
}

// Run common setup on page load
document.addEventListener('DOMContentLoaded', function() {
    setupModals();
});