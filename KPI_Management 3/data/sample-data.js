// Sample data for the KPI tracking system
const sampleData = {
    // User data
    users: [
        {
            id: 1,
            username: 'staff_user',
            password: 'password123',  // In a real app, this would be hashed
            email: 'staff@example.com',
            fullName: 'Staff User',
            department: 'IT',
            position: 'Developer',
            phone: '123-456-7890',
            joinedDate: '2023-01-15',
            role: 'staff'
        },
        {
            id: 2,
            username: 'manager_user',
            password: 'password123',  // In a real app, this would be hashed
            email: 'manager@example.com',
            fullName: 'Manager User',
            department: 'IT',
            position: 'Team Lead',
            phone: '123-456-7891',
            joinedDate: '2022-05-20',
            role: 'manager'
        }
    ],
    
    // KPI data
    kpis: [
        {
            id: 1,
            name: 'Code Quality',
            description: 'Maintain high code quality standards',
            target: 95,
            current: 88,
            deadline: '2024-12-15',
            userId: 1,
            status: 'in-progress'
        },
        {
            id: 2,
            name: 'Project Completion',
            description: 'Complete assigned projects on time',
            target: 100,
            current: 75,
            deadline: '2024-11-30',
            userId: 1,
            status: 'in-progress'
        },
        {
            id: 3,
            name: 'Documentation',
            description: 'Ensure all code is properly documented',
            target: 100,
            current: 60,
            deadline: '2024-12-20',
            userId: 1,
            status: 'in-progress'
        },
        {
            id: 4,
            name: 'Team Performance',
            description: 'Overall team performance metrics',
            target: 90,
            current: 82,
            deadline: '2024-12-31',
            userId: 2,
            status: 'in-progress'
        }
    ],
    
    // Evidence submissions
    evidenceSubmissions: [
        {
            id: 1,
            kpiId: 1,
            userId: 1,
            details: 'Implemented code review process and achieved 88% coverage',
            submissionDate: '2024-10-05',
            status: 'pending'
        },
        {
            id: 2,
            kpiId: 2,
            userId: 1,
            details: 'Completed 3 out of 4 project milestones ahead of schedule',
            submissionDate: '2024-10-10',
            status: 'approved'
        }
    ],
    
    // Team performance data for manager view
    teamPerformance: [
        { name: 'Staff User', kpis: 3, completed: 1, inProgress: 2, overdue: 0 },
        { name: 'John Doe', kpis: 4, completed: 2, inProgress: 1, overdue: 1 },
        { name: 'Jane Smith', kpis: 3, completed: 3, inProgress: 0, overdue: 0 },
        { name: 'Mike Johnson', kpis: 5, completed: 2, inProgress: 3, overdue: 0 }
    ]
};