// D3.js visualizations for KPI dashboard

/**
 * Create KPI progress chart using D3.js
 */
function createKPIChart() {
    const kpiChartContainer = document.getElementById('kpi-chart');
    if (!kpiChartContainer) return;
    
    // Use staff user ID for demo
    const userId = 1;
    
    // Get KPIs for user
    const userKPIs = sampleData.kpis.filter(kpi => kpi.userId === userId);
    
    // Prepare data for visualization
    const chartData = userKPIs.map(kpi => ({
        name: kpi.name,
        current: kpi.current,
        target: kpi.target
    }));
    
    // Clear previous chart
    d3.select('#kpi-chart').html('');
    
    // Set dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
        width = kpiChartContainer.offsetWidth - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select('#kpi-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create x and y scales
    const x = d3.scaleBand()
        .domain(chartData.map(d => d.name))
        .range([0, width])
        .padding(0.3);
    
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    
    // Create axes
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');
    
    svg.append('g')
        .call(d3.axisLeft(y).tickFormat(d => d + '%'));
    
    // Create tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
    
    // Create bars for current values
    svg.selectAll('.bar-current')
        .data(chartData)
        .enter()
        .append('rect')
        .attr('class', 'bar-current')
        .attr('x', d => x(d.name))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.current))
        .attr('height', d => height - y(d.current))
        .attr('fill', '#4e73df')
        .on('mouseover', function(event, d) {
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`Current: ${d.current}%<br>Target: ${d.target}%`)
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });
    
    // Create target lines
    svg.selectAll('.target-line')
        .data(chartData)
        .enter()
        .append('line')
        .attr('class', 'target-line')
        .attr('x1', d => x(d.name))
        .attr('x2', d => x(d.name) + x.bandwidth())
        .attr('y1', d => y(d.target))
        .attr('y2', d => y(d.target))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
}

/**
 * Create KPI completion chart using D3.js
 */
function createCompletionChart() {
    const completionChartContainer = document.getElementById('completion-chart');
    if (!completionChartContainer) return;
    
    // Sample completion data
    const completionData = [
        { status: 'Completed', value: 25 },
        { status: 'In Progress', value: 60 },
        { status: 'Overdue', value: 15 }
    ];
    
    // Clear previous chart
    d3.select('#completion-chart').html('');
    
    // Set dimensions
    const width = completionChartContainer.offsetWidth,
        height = 250,
        radius = Math.min(width, height) / 2;
    
    // Color scale
    const color = d3.scaleOrdinal()
        .domain(completionData.map(d => d.status))
        .range(['#1cc88a', '#f6c23e', '#e74a3b']);
    
    // Create SVG
    const svg = d3.select('#completion-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);
    
    // Create pie chart
    const pie = d3.pie()
        .value(d => d.value);
    
    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8);
    
    const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);
    
    // Create tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
    
    // Draw pie slices
    svg.selectAll('allSlices')
        .data(pie(completionData))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.status))
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .on('mouseover', function(event, d) {
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`${d.data.status}: ${d.data.value}%`)
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });
    
    // Add labels
    svg.selectAll('allLabels')
        .data(pie(completionData))
        .enter()
        .append('text')
        .text(d => `${d.data.status}: ${d.data.value}%`)
        .attr('transform', function(d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
        })
        .style('text-anchor', function(d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midangle < Math.PI ? 'start' : 'end');
        })
        .style('font-size', '12px');
    
    // Add polylines
    svg.selectAll('allPolylines')
        .data(pie(completionData))
        .enter()
        .append('polyline')
        .attr('points', function(d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            return [arc.centroid(d), outerArc.centroid(d), pos];
        })
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-width', '1px');
}

/**
 * Create team performance chart for manager view
 */
function createTeamPerformanceChart() {
    const teamChartContainer = document.getElementById('team-performance-chart');
    if (!teamChartContainer) return;
    
    // Prepare data
    const data = sampleData.teamPerformance;
    
    // Clear previous chart
    d3.select('#team-performance-chart').html('');
    
    // Set dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 50 },
        width = teamChartContainer.offsetWidth - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select('#team-performance-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create x and y scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .padding(0.3);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.completed + d.inProgress + d.overdue)])
        .range([height, 0]);
    
    // Create axes
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
    
    svg.append('g')
        .call(d3.axisLeft(y));
    
    // Create tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
    
    // Create stacked bars
    // Completed KPIs
    svg.selectAll('.bar-completed')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar-completed')
        .attr('x', d => x(d.name))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.completed))
        .attr('height', d => height - y(d.completed))
        .attr('fill', '#1cc88a')
        .on('mouseover', function(event, d) {
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`Completed: ${d.completed}`)
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });
    
    // In Progress KPIs
    svg.selectAll('.bar-inprogress')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar-inprogress')
        .attr('x', d => x(d.name))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.completed + d.inProgress))
        .attr('height', d => height - y(d.inProgress))
        .attr('fill', '#f6c23e')
        .on('mouseover', function(event, d) {
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`In Progress: ${d.inProgress}`)
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });
    
    // Overdue KPIs
    svg.selectAll('.bar-overdue')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar-overdue')
        .attr('x', d => x(d.name))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.completed + d.inProgress + d.overdue))
        .attr('height', d => height - y(d.overdue))
        .attr('fill', '#e74a3b')
        .on('mouseover', function(event, d) {
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`Overdue: ${d.overdue}`)
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });
    
    // Add legend
    const legend = svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('text-anchor', 'end')
        .selectAll('g')
        .data(['Completed', 'In Progress', 'Overdue'])
        .enter().append('g')
        .attr('transform', (d, i) => `translate(0,${i * 20})`);
    
    legend.append('rect')
        .attr('x', width - 19)
        .attr('width', 19)
        .attr('height', 19)
        .attr('fill', d => {
            if (d === 'Completed') return '#1cc88a';
            if (d === 'In Progress') return '#f6c23e';
            return '#e74a3b';
        });
    
    legend.append('text')
        .attr('x', width - 24)
        .attr('y', 9.5)
        .attr('dy', '0.32em')
        .text(d => d);
}

/**
 * Initialize all visualizations
 */
function initializeVisualizations() {
    // Check if we're on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        createKPIChart();
        createCompletionChart();
        
        // Handle window resize for responsive charts
        window.addEventListener('resize', function() {
            createKPIChart();
            createCompletionChart();
        });
    }
    
    // Check if we're on manager page
    if (window.location.pathname.includes('manager.html')) {
        createTeamPerformanceChart();
        
        // Handle window resize for responsive chart
        window.addEventListener('resize', createTeamPerformanceChart);
    }
}

// Run on page load if D3 is available
document.addEventListener('DOMContentLoaded', function() {
    if (typeof d3 !== 'undefined') {
        initializeVisualizations();
    }
});