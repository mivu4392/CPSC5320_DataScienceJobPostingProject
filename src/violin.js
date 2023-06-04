// Set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 30, left: 110 },
  width = 1020 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// Define colors
const color1 = "#87CEEB";
const color2 = "#90EE90";
const color3 = "#9370DB";
const color4 = "#FFB6C1";
const color5 = "#FFDAB9";
const color6 = "#f2555d";
const color7 = "#D2B48C";

// Define an object to store the tooltip data
var tooltipData = {
  "Business Analyst": {
    minSalary: 36400,
    maxSalary: 208000
  },
  "Business Intelligence Developer": {
    minSalary: 57200,
    maxSalary: 151840
  },
  "Data Analyst": {
    minSalary: 33280,
    maxSalary: 162240
  },
  "Data Engineer": {
    minSalary: 41600,
    maxSalary: 187200
  },
  "Data Scientist": {
    minSalary: 36400,
    maxSalary: 215010
  },
  "Database Administrator": {
    minSalary: 50211,
    maxSalary: 165360
  },
  "Machine Learning Engineer": {
    minSalary: 52000,
    maxSalary: 194106
  }
};

// Append the main SVG object to the body of the page
var mainSvg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Append the legends SVG object to the body of the page
var legendsSvg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", 250) // Adjust the width as needed
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(10," + margin.top + ")"); // Adjust the left margin as needed

// Create a tooltip
var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Function to update the violin plots
function updateViolinPlots(selectedFile, lowerlimit, upperlimit) {
  // Load data from CSV file
  mainSvg.selectAll("*").remove();
  d3.csv(selectedFile, function (data) {
    // Create y-axis scale
    var y = d3.scaleLinear().domain([lowerlimit, upperlimit]).range([height, 0]);

    // Append y-axis to the main SVG
    var yAxis = d3.axisLeft(y).tickFormat(function (d) {
      // Convert the value to abbreviated format
      var format = d3.format(".2s");
      var formattedValue = format(d);

      // Add 'K' or 'M' based on the magnitude of the value
      if (formattedValue.slice(-1) === "K") {
        return "$" + formattedValue.slice(0, -1) + "K";
      } else if (formattedValue.slice(-1) === "M") {
        return "$" + formattedValue.slice(0, -1) + "M";
      } else {
        return "$" + formattedValue;
      }
    });

    mainSvg.append("g").call(yAxis).selectAll("text").style("font-size", "12px"); // Adjust the font size as needed


    // Create x-axis scale
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain([
        "Data Analyst",
        "Data Scientist",
        "Business Analyst",
        "Business Intelligence Developer",
        "Data Engineer",
        "Database Administrator",
        "Machine Learning Engineer",
      ])
      .padding(0.2);

    // Append x-axis to the main SVG
    mainSvg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "10px");

    // Create y-axis label
    mainSvg
    .append("text")
    .attr("class", "myText")
    .attr("transform", "translate(-80," + height / 40 + ") rotate(-360)")
    .style("text-anchor", "middle")
    .text("Salary");


    // Create histogram function
    var histogram = d3
      .histogram()
      .domain(y.domain())
      .thresholds(y.ticks(10))
      .value((d) => d);

    // Perform nested data manipulation
    var sumstat = d3
      .nest()
      .key(function (d) {
        return d.Title;
      })
      .rollup(function (d) {
        input = d.map(function (g) {
          return g.Salary;
        });
        bins = histogram(input);
        return bins;
      })
      .entries(data);

    // Sort sumstat based on the x-axis domain order
    sumstat.sort(function (a, b) {
      return x.domain().indexOf(a.key) - x.domain().indexOf(b.key);
    });

    // Get the maximum length of bins
    var maxNum = d3.max(sumstat, function (d) {
      return d3.max(d.value, function (v) {
        return v.length;
      });
    });

    // Create xNum scale for the violin plots
    var xNum = d3.scaleLinear().range([0, x.bandwidth() * 1.5]).domain([-maxNum, maxNum]);

    // Draw violin plots
    mainSvg
      .selectAll("myViolin")
      .data(sumstat)
      .enter()
      .append("g")
      .attr("transform", function (d) {
        var xPosition = x(d.key) + (x.bandwidth() - xNum(maxNum)) / 2;
        return "translate(" + xPosition + ",-1)";
      })
      .append("path")
      .datum(function (d) {
        return d.value;
      })
      .style("stroke", "none")
      .style("fill", function (d, i) {
        return eval("color" + (i % 7 + 1)); // Assign colors based on index
      })
      .attr("d", d3.area()
        .x0(function (d) {
          return xNum(-d.length);
        })
        .x1(function (d) {
          return xNum(d.length);
        })
        .y(function (d) {
          return y(d.x0);
        })
        .curve(d3.curveCatmullRom)
      )

    // Add legends
    var legendLabels = [
      "Data Analyst",
      "Data Scientist",
      "Business Analyst",
      "Business Intelligence Developer",
      "Data Engineer",
      "Database Administrator",
      "Machine Learning Engineer",
    ];
    var legendColors = [color1, color2, color3, color4, color5, color6, color7];

    var legend = legendsSvg
      .append("g")
      .attr("class", "legend")
      .attr("transform", "translate(-10," + margin.top + ")"); // Adjust the y-axis translation as needed

    var legendItems = legend.selectAll(".legend-item")
      .data(legendLabels)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legendItems
      .append("rect")
      .attr("x", 0)
      .attr("y", -8) // Adjust the y-position to align with the plot
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", function (d, i) {
        return legendColors[i];
      });

    legendItems
      .append("text")
      .attr("x", 20)
      .attr("y", 0) // Adjust the y-position to align with the plot
      .text(function (d) {
        return d;
      });
  });
}

// Set default graph
d3.csv("combined.csv", function (data) {
  updateViolinPlots("combined.csv", 0, 240000);
});

// Event listener for radio buttons
d3.selectAll('input[name="file"]').on("change", function () {
  var selectedFile = this.value;

  if (selectedFile === "combined.csv") {
    updateViolinPlots("combined.csv", 0, 240000);
  } else if (selectedFile === "remote.csv") {
    updateViolinPlots("remote.csv", 0, 240000);
  } else if (selectedFile === "inperson.csv") {
    updateViolinPlots("inperson.csv", 0, 240000);
  }
});
