import * as d3 from "d3";

export const analyzeAndVisualizeData = (data, svgRef) => {
  // Dimensions and margins
  const width = 500;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  // Color scale for labels
  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  // Select the SVG element and clear any previous content
  const svg = d3.select(svgRef.current);
  svg.selectAll("*").remove();

  // Create a container group and apply margins
  const container = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  // Define scales for x and y axes
  const xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.feature1), d3.max(data, d => d.feature1)]) // Use min and max for better scaling
    .range([0, plotWidth]);

  const yScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.feature2), d3.max(data, d => d.feature2)]) // Use min and max for better scaling
    .range([plotHeight, 0]);

  // Draw x-axis
  container.append("g")
    .attr("transform", `translate(0,${plotHeight})`)
    .call(d3.axisBottom(xScale));

  // Draw y-axis
  container.append("g")
    .call(d3.axisLeft(yScale));

  // Draw scatter points
  container.selectAll(".point")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.feature1))
    .attr("cy", d => yScale(d.feature2))
    .attr("r", 6)
    .attr("fill", d => colors(d.label))
    .attr("opacity", 0.8)
    .on("mouseover", function () {
      d3.select(this).transition().attr("r", 10); // Enlarge on hover
    })
    .on("mouseout", function () {
      d3.select(this).transition().attr("r", 6); // Restore size on mouseout
    });

  // Add x-axis label
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .style("text-anchor", "middle")
    .text("Feature 1");

  // Add y-axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .style("text-anchor", "middle")
    .text("Feature 2");
};
