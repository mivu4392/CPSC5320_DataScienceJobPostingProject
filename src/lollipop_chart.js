
    // set the dimensions and margins of the graph
    var margin = { top: 50, right: 10, bottom: 110, left: 270 },
      width = 1100 - margin.left - margin.right,
      height = 660 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("../data/skillset_ba.csv", function (data) {

       //sort data
      data.sort(function (b, a) {
       return a.Count - b.Count;
      });

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 2.0])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("font-size", "14px")
        .selectAll("text")
        .attr("transform", "translate(0,0)")
        .style("text-anchor", "end");

      // Y axis
      var y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(function (d) { return d.Skill; }))
        .padding(1);


      svg.append("g")
        .call(d3.axisLeft(y))
        .attr("font-size", "14px")
        .selectAll("text")
        .text(function (d) {
          // Convert the text to camel case
          // Example: convert "example text" to "ExampleText"
          var words = d.split(" ");
          var camelCaseText = words.map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          });
          return camelCaseText.join(" ");
        });

      // create a tooltip
      var formatCount = d3.format(".2f");
      function formatText(skillword) {
        var words = skillword.split(" ");
        var camelCaseText = words.map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          });
        return camelCaseText.join("");
      }

      var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("font-size", "16px")
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function (d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 1)
        tooltip
          
          .html("<table>" +
        "<tr>" + "<td>Job Title:</td>" + "<td style=\"padding-left: 1px;\">" + "Business Analyst" + "</td>" + "</tr>" +
        "<tr>" + "<td>Skill:</td>" + "<td style=\"padding-left: 10px;\">" + formatText(d.Skill) + "</td>" + "</tr>" +
        "<tr>" + "<td>Relative Frequency:</td>" + "<td style=\"padding-left: 10px;\">" + formatCount(d.Count) + "</td>" + "</tr>" +
        
        "</table>")
          .style("right", (d3.mouse(this)[0]) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      }
      var mousemove = function (d) {
        tooltip
          .style("right", (d3.mouse(this)[0] + 300) + "px")
          .style("top", (d3.mouse(this)[1] + 300) + "px")
      }
      var mouseleave = function (d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
      }
      // Lines
      svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) { return x(d.Count); })
        .attr("x2", x(0))
        .attr("y1", function (d) { return y(d.Skill); })
        .attr("y2", function (d) { return y(d.Skill); })
        .attr("stroke", "grey")



      // Circles
      svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Count); })
        .attr("cy", function (d) { return y(d.Skill); })
        .attr("r", "7")
        .style("fill", "#9370DB")
        .attr("stroke", "black")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

        // Add Y axis label
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle") // Set text-anchor to "middle"
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2) // Set x position to half of the height
    .attr("transform", "rotate(-90)")
    .text("Skill sets")
    .style("font-size", "23px")
    .style("font-weight", "bold")
    .style("font-family", "Arial");

  // Add X axis label
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 10)
    .text("Relative Frequencies")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("font-family", "Arial");

      

    })


    var currentButtonId = ""; // Variable to store the ID of the currently focused button
    //after pressing a button
    function update(buttonId, dataset, jobTitle, colorValue) {

      // Parse the Data
      d3.csv(dataset, function (data) {

        // sort data
        data.sort(function (b, a) {
          return a.Count - b.Count;
        });
        svg.selectAll("*").remove();
        // Add X axis
        var x = d3.scaleLinear()
          .domain([0, 2.0])
          .range([0, width]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .attr("font-size", "14px")
          .selectAll("text")
          .attr("transform", "translate(0,0)")
          .style("text-anchor", "end");

        // Y axis
        var y = d3.scaleBand()
          .range([0, height])
          .domain(data.map(function (d) { return d.Skill; }))
          .padding(1);

        svg.append("g")
          .call(d3.axisLeft(y))
          .attr("font-size", "14px")
          .selectAll("text")
          .text(function (d) {
            // Convert the text to camel case

            var words = d.split(" ");
            var camelCaseText = words.map(function (word) {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            });
            return camelCaseText.join(" ");
          });

        // create a tooltip
        var formatCount = d3.format(".2f");
        function formatText(skillword) {
          var words = skillword.split(" ");
          var camelCaseText = words.map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          })
          return camelCaseText.join("");
        }
        var tooltip = d3.select("body")
          .append("div")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("opacity", 0)
          .attr("class", "tooltip")
          .style("font-size", "16px")
        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function (d) {
          tooltip
            .transition()
            .duration(200)
            .style("opacity", 1)
          tooltip
          .html("<table>" +
        "<tr>" + "<td>Job Title:</td>" + "<td style=\"padding-left: 1px;\">" + jobTitle + "</td>" + "</tr>" +
        "<tr>" + "<td>Skill:</td>" + "<td style=\"padding-left: 10px;\">" + formatText(d.Skill) + "</td>" + "</tr>" +
        "<tr>" + "<td>Relative Frequency:</td>" + "<td style=\"padding-left: 10px;\">" + formatCount(d.Count) + "</td>" + "</tr>" +
        
        "</table>")
            
            .style("right", (d3.mouse(this)[0]) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
        }
        var mousemove = function (d) {
          tooltip
            .style("right", (d3.mouse(this)[0] + 250) + "px")
            .style("top", (d3.mouse(this)[1] + 300) + "px")
        }
        var mouseleave = function (d) {
          tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
        }

        // Lines
        svg.selectAll("myline")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", function (d) { return x(d.Count); })
          .attr("x2", x(0))
          .attr("y1", function (d) { return y(d.Skill); })
          .attr("y2", function (d) { return y(d.Skill); })
          .attr("stroke", "grey")


        // Circles
        svg.selectAll("mycircle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function (d) { return x(d.Count); })
          .attr("cy", function (d) { return y(d.Skill); })
          .attr("r", "7")
          .style("fill", colorValue)
          .attr("stroke", "black")
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
        // Add Y axis label
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle") // Set text-anchor to "middle"
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2) // Set x position to half of the height
    .attr("transform", "rotate(-90)")
    .text("Skill sets")
    .style("font-size", "23px")
    .style("font-weight", "bold")
    .style("font-family", "Arial");

  // Add X axis label
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 10)
    .text("Relative Frequencies")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("font-family", "Arial");


        var buttons = document.getElementsByClassName('btn');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('active');
        }

        // Add the active class to the clicked button
        document.getElementById(buttonId).classList.add('active');


      });
    };
  