// set the dimensions and margins of the graph
var margin = { top: 10, right: 350, bottom: 100, left: 300 }
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var width = windowWidth - 1.5 * margin.left - margin.right;
var height = windowHeight - margin.top - 2.5 * margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

let words = { "Data Scientist": { "negativeScore": ["pay", "problems", "limited", "problem", "critical", "leave", "manipulating", "no", "sick", "criminal", "hard", "fraud", "victim", "risk", "crime"], "positiveScore": ["benefits", "strong", "ability", "solutions", "opportunity", "please", "advanced", "opportunities", "support", "help", "vision", "like", "create", "intelligence", "value"], "neutralScore": ["data", "experience", "our", "we", "you", "business", "science", "work", "learning", "team", "this", "years", "machine", "skills", "scientist"] }, "Business Analyst": { "negativeScore": ["pay", "problems", "limited", "problem", "critical", "risks", "no", "defects", "risk", "manipulation", "pain", "defect", "regret", "mock", "error"], "positiveScore": ["ability", "solutions", "support", "strong", "create", "benefits", "well", "excellent", "vision", "ensure", "responsible", "opportunities", "help", "solution", "good"], "neutralScore": ["business", "experience", "requirements", "work", "data", "skills", "analysis", "job", "years", "team", "analyst", "required", "location", "hour", "management"] }, "Data Engineer": { "negativeScore": ["pay", "problems", "limited", "problem", "critical", "hard", "no", "harassment", "leave", "manipulation", "disaster", "obstacles", "arrest", "blocks", "error"], "positiveScore": ["solutions", "strong", "ability", "support", "spark", "benefits", "well", "good", "best", "create", "vision", "advanced", "please", "optimizing", "like"], "neutralScore": ["data", "experience", "years", "work", "job", "sql", "required", "preferred", "location", "year", "azure", "business", "skills", "hour", "you"] }, "Database Administrator": { "negativeScore": ["pay", "problem", "critical", "problems", "limited", "disaster", "leave", "no", "emergency", "risk", "errors", "illness", "manipulation", "vulnerable", "risks"], "positiveScore": ["support", "ability", "security", "solutions", "benefits", "ensure", "strong", "responsible", "excellent", "improve", "opportunity", "supporting", "desired", "vision", "abilities"], "neutralScore": ["database", "experience", "work", "data", "required", "databases", "sql", "this", "our", "performance", "skills", "systems", "years", "management", "all"] }, "Machine Learning Engineer": { "negativeScore": ["pay", "problems", "problem", "leave", "rigorous", "no", "challenged", "limited", "critical", "manipulating", "tough", "sick", "offline", "difficult", "pain"], "positiveScore": ["benefits", "solutions", "support", "ability", "vision", "strong", "help", "ensure", "best", "solve", "opportunity", "protected", "good", "improve", "excellent"], "neutralScore": ["data", "experience", "learning", "machine", "our", "we", "you", "work", "team", "ml", "models", "your", "science", "engineering", "job"] }, "Business Intelligence Developer": { "negativeScore": ["pay", "problems", "problem", "critical", "leave", "no", "mock", "lower", "error", "disadvantaged", "harassment", "degraded", "criminal", "lone", "litigation"], "positiveScore": ["intelligence", "ability", "solutions", "benefits", "support", "strong", "opportunity", "best", "vision", "flexible", "create", "responsible", "opportunities", "help", "comprehensive"], "neutralScore": ["data", "business", "experience", "work", "our", "bi", "sql", "skills", "you", "reporting", "this", "we", "years", "power", "insurance"] }, "Data Analyst": { "negativeScore": ["pay", "problem", "problems", "manipulation"], "positiveScore": ["support", "good", "solutions", "focused", "solution", "ability", "help", "assurance", "supporting", "supported", "successful", "dynamic", "amazon", "benefits", "vision"], "neutralScore": ["data", "experience", "work", "network", "business", "preferred", "insurance", "job", "analytics", "service", "working", "cloud", "requirements", "software", "across"] } }

// Parse the Data
d3.csv("../data/data_stack.csv", function (data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function (d) { return (d.group) }).keys()

  // Add Y axis
  var y = d3.scaleBand()
    .domain(groups)
    .range([0, height])
    .padding([0.2])
    .align(0.5); // Set the alignment to 0.5 for centering the bars
  var yAxis = svg.append("g")
    .attr("class", "y-axis")
    .style("font-size", "18px")
    .style("font-family", "Arial")
    .call(d3.axisLeft(y).tickSize(0));
  yAxis.selectAll("text")
    .attr("x", -10); // Adjust the x position by subtracting 10 pixels

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .style("font-size", "18px")
    .style("font-family", "Arial");

  // Color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#4daf4a', '#FFBB78', '#e41a1c'])

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

  // ----------------
  // Create a tooltip
  // ----------------
  var formatCount = d3.format(".2f");
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("font-size", "16px")

  // Three function that change the tooltip when user hover / move / leave a cell


  var mouseover = function (jobTitle, subgroupName, subgroupValue, ww) {
    if (subgroupName === "negativeScore") {
      subgroupName = "Negative";
    } else if (subgroupName === "positiveScore") {
      subgroupName = "Positive";
    } else {
      subgroupName = "Neutral";
    }
    tooltip
      .html("<table>" +
        "<tr>" + "<td>Job Title:</td>" + "<td style=\"padding-left: 10px;\">" + jobTitle + "</td>" + "</tr>" +
        "<tr>" + "<td>Group:</td>" + "<td style=\"padding-left: 10px;\">" + subgroupName + "</td>" + "</tr>" +
        "<tr>" + "<td>Sentiment Score:</td>" + "<td style=\"padding-left: 10px;\">" + formatCount(subgroupValue) + "</td>" + "</tr>" +
        "<tr>" + "<td style=\"vertical-align: top;\">Word List:</td>" + "<td style=\"width: 230px; padding-left: 10px;\" >" + ww + "</td>" + "</tr>" +
        "</table>")
      .style("opacity", 1)

  };
  var mousemove = function (d) {
    tooltip
      // .style("left", (d3.mouse(this)[0] + 460) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      // .style("top", (d3.mouse(this)[1] + 200) + "px")
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY + 10) + "px");
  };
  var mouseleave = function (d) {
    tooltip
      .style("opacity", 0)
  };




  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)

    .enter().append("g")
    .attr("fill", function (d) { return color(d.key); })
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(function (d) { return d; })
    // console.log(data.group)
    //.words(function() { return {jobTitle:d.data.group, group:d.key}})//text: d.word, size:d.size,story_title:story}; }))
    .enter().append("rect")
    .attr("x", function (d) { return x(d[0]); })
    .attr("y", function (d) { return y(d.data.group) + (y.bandwidth() - 40) / 2; })
    .attr("width", function (d) { return x(d[1]) - x(d[0]); })
    .attr("height", y.bandwidth() - 10)
    .attr("stroke", "grey")

    .on("mouseover", function (d) {
      var subgroupName = d3.select(this.parentNode).datum().key.toString();
      var jobTitle = d.data.group.toString();


      var wordList = words[jobTitle][subgroupName];
      var wordListText = wordList.join(", ");
      var subgroupValue = d.data[subgroupName];

      mouseover(jobTitle, subgroupName, subgroupValue, wordListText);
    })
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);


  // Add Y axis label
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle") // Set text-anchor to "middle"
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2) // Set x position to half of the height
    .attr("transform", "rotate(-90)")
    .text("Jobs")
    .style("font-size", "22px")
    .style("font-weight", "bold")
    .style("font-family", "Arial");

  // Add X axis label
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width / 1.6)
    .attr("y", height + margin.bottom / 2)
    .text("Sentiment Scores")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("font-family", "Arial");

  // Add legend
  var legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (width + 100) + "," + 30 + ")")
    .selectAll("g")
    .data(subgroups)
    .enter().append("g")
    .attr("transform", function (d, i) { return "translate(0," + i * 50 + ")"; })
    .style("font-size", "18px")
    .style("font-family", "Arial");

  legend.append("rect")
    .attr("x", margin.right / 7)
    .attr("y", height / 2 - margin.bottom - margin.top)
    .attr("width", 30)
    .attr("height", 30)
    .attr("fill", color);

  legend.append("text")
    .attr("x", margin.right/ 4)
    .attr("y", height / 2 - margin.bottom + 5)
    .attr("dy", ".35em")
    .text(function (d) {
      if (d === "negativeScore") return "Negative";
      if (d === "positiveScore") return "Positive";
      if (d === "neutralScore") return "Neutral";
      return d;
    });
}) 