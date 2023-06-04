document.addEventListener("DOMContentLoaded", function () {
  // Prepare the data
  var data = [
    {
      job: "Business Analyst",
      negativeScore: 0.0165,
      positiveScore: 0.139,
      neutralScore: 0.8445
    },
    {
      job: "Business Intelligence Developer",
      negativeScore: 0.0154,
      positiveScore: 0.1758,
      neutralScore: 0.8088
    },
    {
      job: "Data Analyst",
      negativeScore: 0.0072,
      positiveScore: 0.1872,
      neutralScore: 0.8056
    },
    {
      job: "Data Engineer",
      negativeScore: 0.0096,
      positiveScore: 0.1302,
      neutralScore: 0.8602
    },
    {
      job: "Data Scientist",
      negativeScore: 0.0192,
      positiveScore: 0.1452,
      neutralScore: 0.8356
    },
    {
      job: "Database Administrator",
      negativeScore: 0.0154,
      positiveScore: 0.1478,
      neutralScore: 0.8368
    },
    {
      job: "Machine Learning Engineer",
      negativeScore: 0.0122,
      positiveScore: 0.1399,
      neutralScore: 0.8479
    }
  ];

  let words = { "Data Scientist": { "Negative Words": ["critical", "lack", "hunger", "devastating", "frustrating", "mock", "wrong", "problem", "harassment", "disadvantages", "sad", "bias", "exploiting", "bad", "vulnerable", "crime", "exhaustive", "burden", "geeks", "miserly", "offline", "losing", "errors", "obsessive", "demand", "avoid", "naive", "violence", "fraud", "fire", "tough", "disadvantaged", "risk", "victim", "waste", "pay", "skepticism", "lower", "negative", "hard", "injured", "allergic", "no", "restricts", "cancer", "leave", "spam", "unfair", "arrest", "cuts", "unfortunately", "trapped", "tricky", "criminal", "stop", "manipulating", "risks", "rigorous", "loss", "illness", "blind", "abuse", "cutting", "sick", "failure", "uncertainty", "stresses", "limited", "restricted", "problems", "fake", "toughest"], "Positive Words": ["passion", "fan", "healthy", "creates", "embrace", "good", "improved", "shares", "wealth", "number", "increase", "clear", "comedy", "incentive", "confidence", "clean", "supported", "opportunity", "growing", "desire", "eagerness", "play", "energized", "engagement", "authority", "flexible", "backing", "ensure", "perfect", "outreach", "promote", "useful", "winning", "creative", "smart", "positive", "enthusiastically", "strengthening", "better", "optimal", "advantage", "intelligence", "solving", "party", "energy", "easily", "importance", "interested", "robust", "talented", "commit", "rich", "dedicated", "intellectual", "demonstration", "holidays", "validated", "boosting", "ethical", "successfully", "exploration", "perfection", "substantial", "entertainment", "challenges", "progress", "superior", "truth", "wellness", "like", "encourage", "joy", "gains", "recommend", "certainly", "sincerely", "safety", "determined", "incentives", "profitability", "honest", "ensuring", "compelled", "reach", "helpful", "novel", "nice", "supports", "vision", "engages", "approved", "validate", "cool", "powerful", "welcome", "bonuses", "valued", "intelligently", "advanced", "improvement", "comprehensive", "improving", "grant", "amazing", "clarity", "ideal", "celebrate", "spirit", "treat", "encouraged", "integrity", "please", "successes", "excellent", "best", "legal", "creativity", "acceptable", "succeed", "easy", "respect", "giving", "rewarding", "chance", "share", "strengths", "mature", "inspire", "determination", "ability", "natural", "clearly", "abilities", "bonus", "expand", "loved", "flexibility", "creating", "responsible", "smartest", "united", "curious", "freedom", "welcoming", "comfort", "dream", "assures", "solutions", "true", "validating", "validates", "pride", "certain", "challenging", "reached", "engaging", "advantages", "popular", "strong", "shared", "fit", "create", "benefits", "innovative", "agreement", "successful", "asset", "thoughtful", "thanks", "value", "exciting", "accept", "success", "recommends", "protect", "greatest", "special", "improve", "trust", "helping", "determinations", "supporting", "outstanding", "want", "join", "solution", "innovation", "valuable", "tx", "save", "strengthen", "accomplish", "resolves", "allow", "humor", "positively", "commitment", "gj", "interesting", "diving", "vibrant", "innovate", "appreciate", "launched", "gain", "talent", "hope", "dynamic", "strongly", "important", "sharing", "encourages", "optimize", "love", "effectively", "amazon", "motivated", "friendly", "worth", "celebrating", "well", "assets", "opportunities", "excited", "actively", "efficient", "compelling", "fulfills", "plays", "solve", "benefit", "sure", "happy", "affectional", "beneficial", "helps", "fair", "passionate", "desirable", "agreed", "excellence", "promoting", "efficiency", "solved", "award", "confidently", "proud", "top", "yes", "free", "flexibly", "respects", "truly", "enjoy", "relentless", "interests", "desired", "active", "grants", "playing", "growth", "kind", "legally", "excel", "sunshine", "brilliant", "ambitious", "improvements", "grand", "reaching", "meaningful", "security", "support", "engage", "willingness", "great", "holiday", "matters", "rewards", "respective", "safeguard", "livelihoods", "values", "solid", "dynamics", "care", "proudly", "creation", "accepted", "enthusiasm", "okay", "optimized", "challenge", "yolo", "spark", "effective", "optimise", "protected", "committed", "honesty", "defense", "comfortable", "help", "backed", "generous", "optimization", "significant", "attract", "interest", "competitive", "strength", "matter", "prevent", "likes", "enthusiastic", "inspired", "focused", "optimizing", "won"] }, "Business Analyst": { "Negative Words": ["critical", "mock", "problem", "harassment", "bias", "low", "pain", "missed", "affected", "desperately", "manipulation", "reluctance", "violence", "regret", "defects", "pressure", "risk", "victim", "pay", "indecision", "hard", "confrontational", "no", "seriously", "stopping", "error", "avoidance", "defect", "criminal", "risks", "obstacles", "uncertainty", "po", "limited", "assault", "problems"], "Positive Words": ["passion", "innovative", "healthy", "efficiencies", "agreement", "top", "yes", "successful", "appreciated", "asset", "creates", "reach", "value", "troubleshoot", "helpful", "thanks", "approval", "embrace", "good", "free", "respects", "improved", "enjoy", "agree", "shares", "nice", "wealth", "acceptance", "supports", "vision", "increase", "approved", "clear", "greetings", "vested", "desired", "validate", "active", "welcome", "readiness", "recommends", "success", "bonuses", "valued", "playing", "satisfy", "advanced", "special", "proactive", "supported", "growth", "opportunity", "growing", "improvement", "comprehensive", "supportive", "improve", "improving", "super", "trust", "excel", "amazing", "engagement", "inspiring", "ideal", "accepts", "supporting", "outstanding", "flexible", "esteemed", "want", "improvements", "authority", "integrity", "please", "assurance", "join", "inquisitive", "ensure", "solution", "grand", "excellent", "resolved", "meaningful", "perfect", "security", "best", "support", "trusted", "engage", "promote", "pleasure", "legal", "guarantee", "innovation", "willingness", "valuable", "creative", "tx", "smart", "great", "positive", "credit", "creativity", "acceptable", "matters", "easy", "respect", "giving", "accomplish", "values", "ideally", "solid", "allow", "advantage", "better", "optimal", "dynamics", "intelligence", "positively", "solving", "commitment", "care", "party", "proudly", "engagements", "easily", "parties", "interested", "robust", "creation", "share", "friends", "mature", "determination", "ability", "talent", "clearly", "safe", "rich", "dedicated", "hope", "responsive", "hand", "dynamic", "strongly", "enthusiasm", "brighter", "important", "motivation", "abilities", "sharing", "secure", "challenge", "mandatory", "holidays", "resolve", "bonus", "wells", "optimize", "treasury", "beautiful", "effective", "flexibility", "creating", "love", "loves", "successfully", "committed", "effectively", "protected", "amazon", "responsible", "motivated", "united", "importantly", "curious", "defense", "well", "assets", "greater", "comfort", "opportunities", "challenges", "comfortable", "solutions", "excited", "progress", "actively", "true", "validating", "competent", "efficient", "superior", "champion", "help", "wellness", "validates", "optimization", "solve", "prospects", "enjoys", "significant", "benefit", "like", "certain", "sure", "challenging", "efficiently", "bright", "attract", "helps", "competitive", "interest", "passionate", "engaging", "matter", "desirable", "strength", "excellence", "vital", "troubleshooting", "strong", "increased", "satisfaction", "recommend", "shared", "focused", "keen", "safety", "efficiency", "determined", "fit", "confidently", "highlight", "create", "ensuring", "ready", "benefits"] }, "Data Engineer": { "Negative Words": ["blocks", "critical", "problem", "harassment", "low", "pain", "exhaustive", "repetitive", "fight", "manipulation", "unemployment", "risk", "pay", "hard", "no", "debt", "leave", "error", "arrest", "defect", "disaster", "obstacles", "sick", "suspicious", "uncertainty", "limited", "criticism", "restricted", "problems", "toughest"], "Positive Words": ["passion", "innovative", "healthy", "top", "restful", "successful", "asset", "intelligent", "prospect", "creates", "thanks", "value", "reach", "troubleshoot", "promotes", "eager", "approval", "good", "free", "enjoying", "respects", "exciting", "enjoy", "shares", "nice", "delight", "acceptance", "elegantly", "supports", "vision", "increase", "approved", "clear", "greetings", "interests", "desired", "validate", "active", "incentive", "success", "delicious", "recommends", "bonuses", "clean", "happiness", "advanced", "proactive", "growth", "opportunity", "growing", "legally", "improvement", "comprehensive", "play", "ease", "improve", "improving", "excel", "engagement", "recommended", "helping", "ideal", "supporting", "spirit", "flexible", "treat", "optimism", "improvements", "want", "integrity", "outstanding", "please", "assurance", "inquisitive", "join", "solution", "ensure", "reaching", "excellent", "resolved", "dignity", "meaningful", "security", "best", "support", "satisfies", "engage", "legal", "huge", "innovation", "willingness", "useful", "valuable", "creative", "great", "smart", "positive", "creativity", "rewards", "ok", "easy", "extend", "respect", "giving", "accomplished", "values", "ideally", "solid", "allow", "optimal", "better", "win", "humor", "intelligence", "solving", "commitment", "care", "promising", "honor", "energy", "easily", "parties", "optimizes", "chance", "interested", "fighter", "share", "creation", "robust", "welcomes", "fantastic", "friends", "talented", "accepted", "mature", "gain", "ability", "natural", "safe", "talent", "clearly", "dedicated", "hope", "wish", "dynamic", "strongly", "kindly", "respected", "appreciation", "optimized", "feeling", "secure", "abilities", "important", "mandatory", "holidays", "celebrated", "resolve", "bonus", "optimize", "expand", "spark", "flexibility", "effective", "creatively", "creating", "love", "committed", "effectively", "amazon", "exploration", "responsible", "protected", "fulfill", "united", "motivated", "stable", "elegant", "flagship", "fun", "well", "greater", "comfort", "opportunities", "entertainment", "emotional", "challenges", "comfortable", "solutions", "actively", "excited", "true", "validating", "superior", "efficient", "help", "backed", "talents", "compelling", "generous", "truth", "validates", "wellness", "optimization", "pride", "solve", "comfortably", "like", "enjoys", "challenging", "benefit", "encourage", "fair", "interest", "competitive", "helps", "passionate", "harmoniously", "desirable", "matter", "satisfactory", "agreed", "advantages", "excellence", "troubleshooting", "strong", "increased", "enthusiastic", "recommend", "shared", "optimizing", "focused", "promoting", "sincerely", "safety", "agreements", "efficiency", "determined", "fit", "incentives", "award", "create", "proud", "ensuring", "ready", "benefits"] }, "Database Administrator": { "Negative Words": ["critical", "problem", "harassment", "low", "problematic", "alarms", "vulnerable", "emergency", "exhaustive", "burden", "hardship", "repetitive", "manipulation", "errors", "fail", "pressure", "risk", "accident", "charged", "impose", "pay", "stress", "no", "restricts", "leave", "error", "difficult", "restrict", "disaster", "risks", "loss", "illness", "sick", "limited", "failures", "problems"], "Positive Words": ["passion", "innovative", "healthy", "top", "yes", "successful", "restored", "intelligent", "thoughtful", "creates", "reach", "value", "troubleshoot", "eager", "approval", "enjoying", "good", "embrace", "improved", "enjoy", "shares", "nice", "acceptance", "supports", "number", "vision", "engages", "accept", "courage", "increase", "clear", "desired", "vitality", "ha", "powerful", "active", "success", "recommends", "protect", "bonuses", "grants", "decisive", "greatest", "advanced", "proactive", "supported", "growth", "opportunity", "legally", "growing", "intricate", "comprehensive", "desire", "supportive", "play", "improve", "improving", "grant", "excel", "helping", "inspiring", "ideal", "celebrate", "supporting", "outstanding", "flexible", "want", "encouraged", "integrity", "please", "assurance", "join", "ensure", "solution", "reaching", "excellent", "resolved", "security", "best", "support", "satisfies", "engage", "promote", "guarantee", "innovation", "willingness", "creative", "great", "credit", "positive", "acceptable", "succeed", "rewards", "ok", "nh", "extend", "respect", "enthusiastically", "resolves", "values", "ideally", "better", "solid", "allow", "optimal", "credits", "intelligence", "commitment", "solving", "care", "party", "resolving", "energy", "easily", "securing", "innovate", "importance", "optimizes", "interested", "robust", "creation", "share", "talented", "assuring", "calm", "ability", "clearly", "safe", "talent", "dedicated", "easier", "dynamic", "restores", "strongly", "appreciation", "important", "inspires", "abilities", "secure", "mandatory", "challenge", "demonstration", "holidays", "resolve", "bonus", "optimize", "effective", "flexibility", "creating", "restore", "love", "protected", "committed", "effectively", "responsible", "motivated", "united", "defense", "celebrating", "worth", "remarkable", "well", "welcoming", "opportunities", "challenges", "solutions", "excited", "progress", "efficient", "help", "backed", "generous", "confident", "wellness", "optimization", "plays", "solve", "like", "significant", "challenging", "benefit", "sure", "efficiently", "encourage", "beneficial", "passionate", "engaging", "strength", "desirable", "matter", "prevent", "excellence", "vital", "troubleshooting", "strong", "shared", "recommend", "focused", "loyal", "safety", "prepared", "efficiency", "awards", "create", "proud", "fine", "ensuring", "stronger", "ready", "benefits", "won"] }, "Machine Learning Engineer": { "Negative Words": ["critical", "problem", "pain", "vulnerable", "aggressively", "hesitate", "offline", "manipulation", "errors", "vulnerability", "fail", "challenged", "demand", "tough", "aggressive", "risk", "waste", "failed", "pay", "hard", "unpleasant", "no", "leave", "difficult", "strike", "manipulating", "rigorous", "painful", "sick", "failure", "passively", "limited", "problems"], "Positive Words": ["innovative", "passion", "healthy", "top", "merit", "successful", "yes", "intelligent", "thoughtful", "creates", "reach", "value", "embrace", "good", "free", "exciting", "novel", "truly", "enjoy", "nice", "wealth", "acceptance", "supports", "exempt", "number", "vision", "engages", "increase", "clear", "interests", "desired", "powerful", "incentive", "success", "protect", "welcome", "bonuses", "confidence", "greatest", "invite", "valued", "advanced", "proactive", "supported", "growth", "opportunity", "growing", "legally", "improvement", "comprehensive", "desire", "supportive", "play", "improve", "improving", "trust", "helping", "inspiring", "ideal", "brave", "supporting", "outstanding", "flexible", "want", "encouraged", "backing", "improvements", "integrity", "spirit", "please", "join", "inquisitive", "successes", "ensure", "solution", "excellent", "meaningful", "dignity", "security", "best", "support", "huge", "fresh", "innovation", "willingness", "creative", "tx", "great", "created", "attracts", "positive", "holiday", "creativity", "matters", "succeed", "rewards", "giving", "values", "better", "solid", "compassionate", "win", "optimal", "allow", "intelligence", "commitment", "solving", "care", "party", "energy", "easily", "encouraging", "parties", "importance", "capable", "chance", "interested", "share", "talented", "robust", "calm", "gain", "ability", "natural", "talent", "clearly", "dedicated", "rewarded", "faith", "dynamic", "prominent", "strongly", "important", "abilities", "challenge", "encourages", "holidays", "bonus", "optimize", "expand", "spark", "beautiful", "ethical", "championing", "creatively", "effective", "creating", "flexibility", "successfully", "love", "committed", "protected", "promise", "exploration", "responsible", "effectively", "motivated", "united", "honesty", "importantly", "freedom", "fun", "well", "welcoming", "assets", "comfort", "greater", "opportunities", "dream", "challenges", "comfortable", "solutions", "actively", "progress", "excited", "visionary", "competent", "efficient", "superior", "freelance", "champion", "help", "talents", "generous", "wellness", "comfortably", "optimization", "solve", "like", "significant", "gained", "benefit", "challenging", "sophisticated", "certain", "strengthens", "sure", "efficiently", "fitness", "encourage", "thank", "interest", "competitive", "helps", "passionate", "inspiration", "matter", "desirable", "strength", "dreams", "excellence", "troubleshooting", "strong", "increased", "shared", "recommend", "certainly", "optimizing", "focused", "satisfaction", "safety", "efficiency", "determined", "fit", "incentives", "create", "proud", "ensuring", "stronger", "ready", "benefits"] }, "Business Intelligence Developer": { "Negative Words": ["critical", "degraded", "mock", "problem", "harassment", "interruptions", "emergency", "conflicting", "exhaustive", "disasters", "hardship", "lone", "manipulation", "demand", "disadvantaged", "exposed", "fire", "risk", "wasted", "stress", "pay", "lower", "hard", "no", "leave", "offender", "error", "criminal", "damage", "failure", "litigation", "limited", "restricted", "problems"], "Positive Words": ["innovative", "passion", "healthy", "nurturing", "top", "successful", "yes", "asset", "creates", "troubleshoot", "value", "embrace", "good", "free", "exciting", "freely", "improved", "truly", "nice", "acceptance", "elegantly", "supports", "exempt", "number", "vision", "appreciates", "clear", "safely", "vested", "desired", "interests", "validate", "casual", "active", "incentive", "powerful", "success", "welcome", "bonuses", "grants", "clean", "satisfactorily", "invite", "valued", "gaining", "advanced", "special", "proactive", "supported", "growth", "opportunity", "growing", "improvement", "comprehensive", "desire", "supportive", "troubleshoots", "improve", "improving", "agreeing", "grant", "trust", "excel", "amazing", "engagement", "helping", "inspiring", "ideal", "celebrate", "spirit", "supporting", "flexible", "want", "encouraged", "improvements", "authority", "integrity", "excels", "please", "assurance", "join", "solution", "ensure", "hero", "improves", "excellent", "meaningful", "security", "best", "support", "outgoing", "engage", "promote", "legal", "guarantee", "influential", "innovation", "willingness", "useful", "valuable", "creative", "tx", "winning", "created", "great", "save", "positive", "credit", "creativity", "acceptable", "matters", "succeed", "rewards", "easy", "attachments", "respect", "energetic", "safeguard", "giving", "resolves", "values", "ideally", "better", "solid", "optimal", "win", "intelligence", "solves", "solving", "commitment", "care", "party", "vibrant", "energy", "proudly", "rewarding", "importance", "chance", "interested", "share", "talented", "creation", "mature", "determination", "ability", "gain", "talent", "clearly", "rich", "dedicated", "intellectual", "commit", "faith", "dynamic", "restores", "strongly", "respected", "sharing", "abilities", "encourages", "holidays", "resolve", "bonus", "optimize", "beautiful", "effective", "creating", "successfully", "love", "protected", "committed", "effectively", "fulfill", "responsible", "motivated", "united", "importantly", "curious", "friendly", "flagship", "fun", "intellectually", "well", "welcoming", "assets", "motivate", "adventure", "opportunities", "admired", "emotional", "challenges", "solutions", "actively", "pleasing", "loyalty", "efficient", "help", "talents", "compelling", "harmony", "wellness", "optimization", "outstanding", "solve", "plays", "like", "benefit", "challenging", "enjoys", "significant", "certain", "cares", "sophisticated", "encourage", "fair", "interest", "competitive", "helps", "passionate", "engaging", "excellence", "vital", "troubleshooting", "strong", "shared", "enthusiastic", "recommend", "inspired", "focused", "promoting", "optimizing", "safety", "efficiency", "determined", "determinable", "awards", "profitability", "incentives", "award", "create", "proud", "ensuring", "ready", "benefits"] }, "Data Analyst": { "Negative Words": ["manipulation", "problems", "pay", "problem"], "Positive Words": ["innovative", "ideal", "trust", "challenges", "comfortable", "successful", "supporting", "solutions", "flexible", "improvements", "assurance", "share", "help", "helping", "good", "solution", "ensure", "ability", "meaningful", "solve", "dedicated", "security", "best", "support", "dynamic", "vision", "increase", "great", "positive", "bonus", "optimize", "assure", "strong", "focused", "advanced", "effectively", "amazon", "supported", "responsible", "fulfill", "efficiency", "improve", "solving", "assets", "benefits", "relax"] } };

  // Create the tooltip element
  var tooltip = d3.select("body").append("div").attr("class", "tooltip");

  // Function to handle mouseover event
  function handleMouseover(job) {
    // Get the negative and positive words for the job title from the words dictionary
    var negativeWords = words[job]["Negative Words"];
    var positiveWords = words[job]["Positive Words"];

    // Create the tooltip content
    var tooltipContent = "<strong>Negative Words:</strong><br>" + negativeWords.join(", ") + "<br><br>" +
      "<strong>Positive Words:</strong><br>" + positiveWords.join(", ");

    // Update the tooltip content and position
    tooltip.html(tooltipContent)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");

    // Show the tooltip
    tooltip.classed("visible", true);
  }

  // Function to handle mouseout event
  function handleMouseout() {
    // Hide the tooltip
    tooltip.classed("visible", false);
  }

  // Set the dimensions and margins of the graph
  var margin = { top: 50, right: 250, bottom: 100, left: 300 },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // Append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    ;

  // List of subgroups = sentiment categories
  var subgroups = ["positiveScore", "neutralScore", "negativeScore"];
  // List of jobs
  var groups = data.map(function (d) { return d.job; });

  // Add Y axis
  var y = d3.scaleBand()
    .domain(groups)
    .range([0, height])
    .padding([0.2]);
  svg.append("g")
    .call(d3.axisLeft(y))
    .style("font-size", "18px")
    .style("font-family", "Arial");

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

  // Stack the data
  var stackedData = d3.stack()
    .keys(subgroups)
    (data);

  // Create and append the stacked bars
  svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter().append("g")
    .attr("fill", function (d) { return color(d.key); })
    .selectAll("rect")
    .data(function (d) { return d; })
    .enter().append("rect")
    .attr("y", function (d) { return y(d.data.job); })
    .attr("x", function (d) { return x(d[0]); })
    .attr("width", function (d) { return x(d[1]) - x(d[0]); })
    .attr("height", y.bandwidth())
    ;


  // Add Y axis label
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -margin.left + 20)
    .attr("x", -margin.top - 50)
    .attr("transform", "rotate(-90)")
    .text("Jobs")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("font-family", "Arial");

  // Add X axis label
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width + 50)
    .attr("y", height + margin.top + 30)
    .text("Scores")
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
    .attr("transform", function (d, i) { return "translate(0," + i * 30 + ")"; })
    .style("font-size", "18px")
    .style("font-family", "Arial");

  legend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", color);

  legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .text(function (d) { return d; });

  

});
