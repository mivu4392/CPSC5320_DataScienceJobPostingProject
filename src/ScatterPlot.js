var margin = { top: 40, right: 40, bottom: 100, left: 200 },
  width = window.innerWidth / 1.4 - margin.left - margin.right,
  height = window.innerHeight / 1 - margin.top - margin.bottom;

// Load data from CSV file
d3.csv("../data/scatterplot_data.csv").then(function (data) {
  // Define data
  data.forEach(function (d) {
    d.salary = +d.salary;
    d.rating = +d.job_rating;
    d.location = d.job_location;
    d.title = d.title;
  });

  // Create SVG
  var svg = d3.select("#scatter-plot").attr("width", width).attr("height", height + margin.top);

  // x and y scales
  var xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, function (d) {
      return d.rating;
    })])
    .range([40, width - 40]);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, function (d) {
      return d.salary;
    })])
    .range([height - 40, 40]);

  // Format for salary axis
  var yAxis = d3.axisLeft(yScale).tickFormat(function (d) {
    return d / 1000 + "k";
  });

  // Jitter range
  var jitterRange = 8;

  // Append tooltip div to the body
  var tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("font-size", "16px");

    

  // Draw points including tooltip interactions
  var circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return (xScale(d.rating) + Math.random() * jitterRange - jitterRange / 2); })
    .attr("cy", function (d) { return (yScale(d.salary) + Math.random() * jitterRange - jitterRange / 2); })
    .attr("r", 5)
    .attr("fill", function (d) { return d.location === "remote" ? "#4C78A8" : "#F58518"; })
    .style("opacity", 0.7)
    .on("mouseover", function (d) {
      // Format salary value
      var formattedSalary = "$" + d.salary.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

      // Update the tooltip content
      tooltip.html("<table>" +
        "<tr>" + "<td>Job Title:</td>" + "<td style=\"padding-left: 10px;\">" + d.title + "</td>" + "</tr>" +
        "<tr>" + "<td>Salary:</td>" + "<td style=\"padding-left: 10px; text-align: right;\">" + formattedSalary + "</td>" + "</tr>" +
        "<tr>" + "<td>Job Rating:</td>" + "<td style=\"padding-left: 10px; text-align: right;\">" + d.rating + "</td>" + "</tr>" +
        "<tr>" + "<td>Job Location:</td>" + "<td style=\"padding-left: 10px; text-align: right;\">" + d.location + "</td>" + "</tr>" +
        "</table>")
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 10) + "px")
        .style("opacity", 1.0);

      // Highlight the selected circle
      d3.select(this)
        .classed("highlight", true);
      // Show the correlation line and label based on the location
      line.style("display", "none");
      correlationLabel.style("display", "none");
      if (d.location === "remote") {
        remoteLine.style("display", "block");
        remoteCorrelationLabel.style("display", "block");
        inPersonLine.style("display", "none");
        inPersonCorrelationLabel.style("display", "none");
      } else {
        inPersonLine.style("display", "block");
        inPersonCorrelationLabel.style("display", "block");
        remoteLine.style("display", "none");
        remoteCorrelationLabel.style("display", "none");
      }
    })
    .on("mouseout", function (d) {
      // Hide the tooltip and remove highlight
      tooltip.style("opacity", 0);
      d3.select(this).classed("highlight", false);

      // Hide all correlation lines and labels
      line.style("display", "block");
      correlationLabel.style("display", "block");
      inPersonLine.style("display", "none");
      inPersonCorrelationLabel.style("display", "none");
      remoteLine.style("display", "none");
      remoteCorrelationLabel.style("display", "none");
    });


  // Add X-axis
  svg
    .append("g")
    .attr("transform", "translate(30," + (height - 40) + ")")
    .call(d3.axisBottom(xScale))
    .style("font-size", "16px");;

  // Add Y-axis
  svg
    .append("g")
    .attr("transform", "translate(70,0)")
    .call(yAxis)
    .style("font-size", "16px");;

  // Add X-axis label
  svg
    .append("text")
    .attr("x", width / 2 + 50)
    .attr("y", height )
    .attr("text-anchor", "middle")
    .text("Rating")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("font-family", "Arial");;
    


  // Add Y-axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("Salary")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("font-family", "Arial");;


  // Correlation line
  var line = svg
    .append("line")
    .attr("stroke", "grey")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "3.3")
    .style("display", "block"); // initially display the line

  // Correlation coefficient label
  var correlationLabel = svg
    .append("text")
    .attr("dx", 10)
    .attr("dy", -10)
    .attr("text-anchor", "end")
    .attr("fill", "grey")
    .style("display", "block"); // initially display the label

  // Correlation line for in-person location
  var inPersonLine = svg
    .append("line")
    .attr("stroke", "#F58518")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "3.3")
    .style("display", "block"); // initially hide the line

  // Correlation coefficient label for in-person location
  var inPersonCorrelationLabel = svg
    .append("text")
    .attr("dx", 10)
    .attr("dy", -10)
    .attr("text-anchor", "end")
    .attr("fill", "#F58518")
    .style("display", "block"); // initially hide the label

  // Correlation line for remote location
  var remoteLine = svg
    .append("line")
    .attr("stroke", "#4C78A8")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "3.3")
    .style("display", "block"); // initially hide the line

  // Correlation coefficient label for remote location
  var remoteCorrelationLabel = svg
    .append("text")
    .attr("dx", 10)
    .attr("dy", -10)
    .attr("text-anchor", "end")
    .attr("fill", "#4C78A8")
    .style("display", "block"); // initially hide the label

  // Update points based on radio button selection
  circles.style("display", "block");

  // Update correlation lines and labels based on radio button selection
  d3.selectAll("input[name='title']").on("change", function () {
    var selectedTitle = this.value;
    var filteredData = data.filter(function (d) {
      return selectedTitle === "all" || d.title === selectedTitle;
    });

    if (filteredData.length > 0) {
      // Calculate correlation coefficients (pearson) for all, in-person, and remote locations
      var allCorrelation = ss.sampleCorrelation(
        filteredData.map((d) => d.rating),
        filteredData.map((d) => d.salary)
      ).toFixed(2);
      var inPersonData = filteredData.filter((d) => d.job_location === "in-person");
      var inPersonCorrelation = ss.sampleCorrelation(
        inPersonData.map((d) => d.rating),
        inPersonData.map((d) => d.salary)
      ).toFixed(2);
      var remoteData = filteredData.filter((d) => d.job_location === "remote");
      var remoteCorrelation = ss.sampleCorrelation(
        remoteData.map((d) => d.rating),
        remoteData.map((d) => d.salary)
      ).toFixed(2);

      // Update correlation lines
      line
        .attr("x1", xScale(d3.min(filteredData, (d) => d.rating)))
        .attr("y1", yScale(d3.min(filteredData, (d) => d.salary)))
        .attr("x2", xScale(d3.max(filteredData, (d) => d.rating)))
        .attr("y2", yScale(d3.max(filteredData, (d) => d.salary)))
        .style("display", "block");
      inPersonLine
        .attr("x1", xScale(d3.min(inPersonData, (d) => d.rating)))
        .attr("y1", yScale(d3.min(inPersonData, (d) => d.salary)))
        .attr("x2", xScale(d3.max(inPersonData, (d) => d.rating)))
        .attr("y2", yScale(d3.max(inPersonData, (d) => d.salary)))
        .style("display", "none");
      remoteLine
        .attr("x1", xScale(d3.min(remoteData, (d) => d.rating)))
        .attr("y1", yScale(d3.min(remoteData, (d) => d.salary)))
        .attr("x2", xScale(d3.max(remoteData, (d) => d.rating)))
        .attr("y2", yScale(d3.max(remoteData, (d) => d.salary)))
        .style("display", "none");

      // Update correlation labels
      correlationLabel
        .attr("x", xScale(d3.max(filteredData, (d) => d.rating)))
        .attr("y", yScale(d3.max(filteredData, (d) => d.salary)))
        .text("Correlation (All): " + allCorrelation)
        .style("display", "block");
      inPersonCorrelationLabel
        .attr("x", xScale(d3.max(inPersonData, (d) => d.rating)))
        .attr("y", yScale(d3.max(inPersonData, (d) => d.salary)))
        .text("Correlation (In-Person): " + inPersonCorrelation)
        .style("display", "none");
      remoteCorrelationLabel
        .attr("x", xScale(d3.max(remoteData, (d) => d.rating)))
        .attr("y", yScale(d3.max(remoteData, (d) => d.salary)))
        .text("Correlation (Remote): " + remoteCorrelation)
        .style("display", "none");

      // Update points based on radio button selection
      circles.style("display", function (d) {
        return selectedTitle === "all" || d.title === selectedTitle
          ? "block"
          : "none";
      });
    } else {
      // Hide correlation lines, labels, and points if no data matches the selection
      line.style("display", "none");
      inPersonLine.style("display", "none");
      remoteLine.style("display", "none");
      correlationLabel.style("display", "none");
      inPersonCorrelationLabel.style("display", "none");
      remoteCorrelationLabel.style("display", "none");
      circles.style("display", "none");
    }
  });
});