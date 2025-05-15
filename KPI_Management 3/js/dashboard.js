// Dashboard page specific functionality

/**
 * Load KPI data for the dashboard
 */
function loadKPIData() {
    // Get demo user
    const userId = 1; // Always use staff user ID for demo
    
    // Get KPIs for user
    const userKPIs = sampleData.kpis.filter(kpi => kpi.userId === userId);
    
    // Populate KPI table
    const tableBody = document.getElementById('kpi-table-body');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        userKPIs.forEach(kpi => {
            const progressPercentage = Math.round((kpi.current / kpi.target) * 100);
            const row = document.createElement('tr');
            
            let statusClass = '';
            let statusText = '';
            
            switch(kpi.status) {
                case 'completed':
                    statusClass = 'bg-success';
                    statusText = 'Completed';
                    break;
                case 'in-progress':
                    statusClass = 'bg-warning';
                    statusText = 'In Progress';
                    break;
                case 'overdue':
                    statusClass = 'bg-danger';
                    statusText = 'Overdue';
                    break;
            }
            
            row.innerHTML = `
                <td>${kpi.name}</td>
                <td>${kpi.target}%</td>
                <td>${kpi.current}%</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar ${statusClass}" role="progressbar" 
                            style="width: ${progressPercentage}%" 
                            aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </td>
                <td>${kpi.deadline}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary view-kpi" data-kpi-id="${kpi.id}">View</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }
}

/**
 * Initialize dashboard functionality
 */
function initDashboard() {
    // Only run on dashboard page
    if (!window.location.pathname.includes('dashboard.html')) {
        return;
    }
    
    // Load KPI data
    loadKPIData();
    
    // Initialize visualizations
    if (typeof initializeVisualizations === 'function') {
        initializeVisualizations();
    }
    
    // Handle KPI view button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-kpi')) {
            const kpiId = e.target.getAttribute('data-kpi-id');
            // In a real app, this would show KPI details
            alert('Viewing KPI details for ID: ' + kpiId);
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', initDashboard);