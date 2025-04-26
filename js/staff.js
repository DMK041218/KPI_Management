// Staff page specific functionality

/**
 * Load KPI data for evidence submission
 */
function loadKPIOptions() {
    // Use staff user ID for demo
    const userId = 1;
    
    // Get KPIs for current user that are in progress
    const userKPIs = sampleData.kpis.filter(kpi => 
        kpi.userId === userId && kpi.status === 'in-progress'
    );
    
    // Populate KPI select dropdown
    const kpiSelect = document.getElementById('kpi-select');
    if (kpiSelect) {
        kpiSelect.innerHTML = '<option value="" selected disabled>Choose a KPI...</option>';
        
        userKPIs.forEach(kpi => {
            const option = document.createElement('option');
            option.value = kpi.id;
            option.textContent = kpi.name;
            kpiSelect.appendChild(option);
        });
    }
}

/**
 * Load evidence submission history
 */
function loadEvidenceHistory() {
    // Use staff user ID for demo
    const userId = 1;
    
    // Get evidence submissions for current user
    const userEvidence = sampleData.evidenceSubmissions.filter(evidence => 
        evidence.userId === userId
    );
    
    // Populate evidence history table
    const tableBody = document.getElementById('evidence-history-table');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        userEvidence.forEach(evidence => {
            const kpi = sampleData.kpis.find(k => k.id === evidence.kpiId);
            
            if (kpi) {
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
                    <td>${kpi.name}</td>
                    <td>${evidence.submissionDate}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary view-evidence" data-evidence-id="${evidence.id}">View</button>
                    </td>
                `;
                
                tableBody.appendChild(row);
            }
        });
    }
}

/**
 * Handle KPI evidence submission
 */
function handleEvidenceSubmission() {
    const evidenceForm = document.getElementById('evidence-form');
    
    if (evidenceForm) {
        evidenceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const kpiId = parseInt(document.getElementById('kpi-select').value);
            const details = document.getElementById('evidence-details').value;
            
            if (kpiId && details) {
                // In a real app, this would be an API call
                // For demo purposes, just show success message
                alert('Evidence submitted successfully! Awaiting manager approval.');
                
                // Reset form
                evidenceForm.reset();
            }
        });
    }
}

/**
 * Initialize staff page functionality
 */
function initStaff() {
    // Only run on staff page
    if (!window.location.pathname.includes('staff.html')) {
        return;
    }
    
    // Load KPI options for evidence submission
    loadKPIOptions();
    
    // Load evidence submission history
    loadEvidenceHistory();
    
    // Setup evidence submission handler
    handleEvidenceSubmission();
    
    // Handle evidence view button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-evidence')) {
            const evidenceId = e.target.getAttribute('data-evidence-id');
            // In a real app, this would show evidence details
            alert('Viewing evidence details for ID: ' + evidenceId);
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', initStaff);