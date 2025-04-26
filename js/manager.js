// Manager page specific functionality

/**
 * Load evidence submissions table for manager approval
 */
function loadEvidenceTable() {
    const tableBody = document.getElementById('evidence-table-body');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        sampleData.evidenceSubmissions.forEach(evidence => {
            const user = sampleData.users.find(u => u.id === evidence.userId);
            const kpi = sampleData.kpis.find(k => k.id === evidence.kpiId);
            
            if (user && kpi) {
                const row = document.createElement('tr');
                
                let statusClass = '';
                let statusText = '';
                
                switch(evidence.status) {
                    case 'approved':
                        statusClass = 'bg-success';
                        statusText = 'Approved';
                        break;
                    case 'pending':
                        statusClass = 'bg-warning';
                        statusText = 'Pending';
                        break;
                    case 'rejected':
                        statusClass = 'bg-danger';
                        statusText = 'Rejected';
                        break;
                }
                
                row.innerHTML = `
                    <td>${user.fullName}</td>
                    <td>${kpi.name}</td>
                    <td>${evidence.submissionDate}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary view-evidence" data-evidence-id="${evidence.id}">View</button>
                        ${evidence.status === 'pending' ? `
                            <button class="btn btn-sm btn-success approve-evidence" data-evidence-id="${evidence.id}">Approve</button>
                            <button class="btn btn-sm btn-danger reject-evidence" data-evidence-id="${evidence.id}">Reject</button>
                        ` : ''}
                    </td>
                `;
                
                tableBody.appendChild(row);
            }
        });
    }
}

/**
 * Setup staff list for KPI assignment
 */
function setupStaffList() {
    const staffSelect = document.getElementById('staff-select');
    
    if (staffSelect) {
        // Clear current options
        staffSelect.innerHTML = '<option value="" selected disabled>Choose a staff member...</option>';
        
        // Get staff users
        const staffUsers = sampleData.users.filter(user => user.role === 'staff');
        
        // Add options
        staffUsers.forEach(staff => {
            const option = document.createElement('option');
            option.value = staff.id;
            option.textContent = staff.fullName;
            staffSelect.appendChild(option);
        });
    }
}

/**
 * Handle KPI assignment
 */
function handleKPIAssignment() {
    const assignKpiBtn = document.getElementById('assign-kpi-btn');
    const saveKpiBtn = document.getElementById('save-kpi');
    
    if (assignKpiBtn && document.getElementById('assignKpiModal')) {
        const assignKpiModal = new bootstrap.Modal(document.getElementById('assignKpiModal'));
        
        // Show modal
        assignKpiBtn.addEventListener('click', function() {
            // Load staff list
            setupStaffList();
            
            // Show modal
            assignKpiModal.show();
        });
        
        // Handle save
        if (saveKpiBtn) {
            saveKpiBtn.addEventListener('click', function() {
                const staffId = document.getElementById('staff-select').value;
                const kpiName = document.getElementById('kpi-name').value;
                const kpiDescription = document.getElementById('kpi-description').value;
                const kpiTarget = document.getElementById('kpi-target').value;
                const kpiDeadline = document.getElementById('kpi-deadline').value;
                
                // Validate form
                if (!staffId || !kpiName || !kpiDescription || !kpiTarget || !kpiDeadline) {
                    alert('Please fill all fields.');
                    return;
                }
                
                // In a real app, this would be an API call
                // For demo purposes, just show success message
                alert('KPI assigned successfully!');
                
                // Close modal
                assignKpiModal.hide();
                
                // Reset form
                document.getElementById('assign-kpi-form').reset();
            });
        }
    }
}

/**
 * Handle evidence approval and rejection
 */
function handleEvidenceActions() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-evidence')) {
            const evidenceId = e.target.getAttribute('data-evidence-id');
            // In a real app, this would show evidence details
            alert('Viewing evidence details for ID: ' + evidenceId);
        } else if (e.target.classList.contains('approve-evidence')) {
            const evidenceId = parseInt(e.target.getAttribute('data-evidence-id'));
            // In a real app, this would be an API call
            alert('Evidence approved successfully!');
            loadEvidenceTable();  // Reload table
        } else if (e.target.classList.contains('reject-evidence')) {
            const evidenceId = parseInt(e.target.getAttribute('data-evidence-id'));
            // In a real app, this would be an API call
            alert('Evidence rejected.');
            loadEvidenceTable();  // Reload table
        }
    });
}

/**
 * Initialize manager page functionality
 */
function initManager() {
    // Only run on manager page
    if (!window.location.pathname.includes('manager.html')) {
        return;
    }
    
    // Load evidence table
    loadEvidenceTable();
    
    // Setup team performance chart
    if (typeof createTeamPerformanceChart === 'function') {
        createTeamPerformanceChart();
        
        // Handle window resize for responsive chart
        window.addEventListener('resize', createTeamPerformanceChart);
    }
    
    // Setup KPI assignment
    handleKPIAssignment();
    
    // Setup evidence actions
    handleEvidenceActions();
}

// Run on page load
document.addEventListener('DOMContentLoaded', initManager);