var margin = {top: 60, right: 30, bottom: 40, left:150},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// Load data from CSV file
d3.csv("scatterplot_data.csv").then(function(data) {

    // Define data
    data.forEach(function(d) {
        d.salary = +d.salary;
        d.rating = +d.job_rating;
    });

    // Create SVG
    var svg = d3.select("#scatter-plot")
        .attr("width", width)
        .attr("height", height);

    // x and y scales
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.rating; })])
        .range([40, width - 40]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.salary; })])
        .range([height - 40, 40]);

    // Format for salary axis
    var formatSalary = d3.format(".0s");
    var yAxis = d3.axisLeft(yScale).tickFormat(function(d) { return formatSalary(d).replace("G", "k"); });

    // Jitter range
    var jitterRange = 8;

    // Draw scatter plot
    var circles = svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", function(d) { return xScale(d.rating) + Math.random() * jitterRange - jitterRange/2; })
        .attr("cy", function(d) { return yScale(d.salary) + Math.random() * jitterRange - jitterRange/2; })
        .attr("r", 5)
        .attr("fill", function(d) { return d.job_location === "remote" ? "#4C78A8" : "#F58518"; })
        .style("opacity", 0.7)

    // Add X-axis
    svg.append("g")
        .attr("transform", "translate(30," + (height - 40) + ")")
        .call(d3.axisBottom(xScale));

    // Add Y-axis
    svg.append("g")
        .attr("transform", "translate(70,0)")
        .call(yAxis);

    // Add X-axis label
    svg.append("text")
        .attr("x", width / 2 + 50)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .text("Rating");

    // Add Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Salary");

    // Correlation line
    var line = svg.append("line")
        .attr("stroke", "grey")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "3.3")
        .style("display", "none");

    // Correlation coefficient label
    var correlationLabel = svg.append("text")
        .attr("dx", 10)
        .attr("dy", -10)
        .attr("text-anchor", "end")
        .attr("fill", "grey")
        .style("display", "none");

    // Update data points and label based on radio button selection
    d3.selectAll("input[name='title']").on("change", function () {
        var selectedTitle = this.value;
        var filteredData = data.filter(function(d) {
            return selectedTitle === "all" || d.title === selectedTitle;
        });

        if (filteredData.length > 0) {
            // Calculate correlation coefficient (pearson)
            var correlation = ss.sampleCorrelation(filteredData.map(d => d.rating), filteredData.map(d => d.salary)).toFixed(2);

            // Update correlation line
            line.attr("x1", xScale(d3.min(filteredData, function(d) { return d.rating; })))
                .attr("y1", yScale(d3.min(filteredData, function(d) { return d.salary; })))
                .attr("x2", xScale(d3.max(filteredData, function(d) { return d.rating; })))
                .attr("y2", yScale(d3.max(filteredData, function(d) { return d.salary; })))
                .style("display", "block");

            // Update correlation label
            correlationLabel.attr("x", xScale(d3.max(filteredData, function(d) { return d.rating; })))
                .attr("y", yScale(d3.max(filteredData, function(d) { return d.salary; })))
                .text("Correlation: " + correlation)
                .style("display", "block");

            // Update points based on radio button selection
            circles.style("display", function(d) {
                return selectedTitle === "all" || d.title === selectedTitle ? "block" : "none";
            });
        } else {
            // Hide correlation line, label, and points if no data matches the selection
            line.style("display", "none");
            correlationLabel.style("display", "none");
            circles.style("display", "none");
        }
    });
});