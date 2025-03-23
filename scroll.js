

  // Set up D3 chart (for demo, just a text element in the box)
  const chartContainer = d3.select("#chart");
  chartContainer.append("div")
    .attr("id", "chartLabel")
    .text("Scroll to start");

  // IntersectionObserver to handle step activation
  const steps = document.querySelectorAll(".step");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const step = +entry.target.dataset.step;
        // Update chart based on step
        updateChart(step);
      }
    });
  }, { threshold: 0.6 });
  steps.forEach(step => observer.observe(step));

  // Chart update logic for each step (placeholder for actual visualization changes)
  function updateChart(step) {
    // Example: update the text inside chart based on step
    let label = "";
    if(step === 0) label = "Scenario 1: Socio-economic index";
    if(step === 1) label = "Scenario 2: Top X% Plan";
    if(step === 2) label = "Scenario 3: Outreach focus";
    d3.select("#chartLabel").text(label);
    
    // Example animation: flash background color
    chartContainer
      .style("background", "#ffd")
      .transition().duration(500)
      .style("background", "#eaeaea");
  }

  let currentStep = 0; // Track the current scroll step
let steps = []; // Store step positions

// p5.js Sketch
function setup() {
  const canvas = createCanvas(windowWidth * 0.8, 400);
  canvas.parent('chart'); // Attach canvas to the #chart element
  noLoop(); // Stop continuous drawing until needed
}

function draw() {
  background(255);

  // Change visualization based on the current step
  if (currentStep === 0) {
    // Initial population visualization
    fill(100, 150, 200);
    ellipse(width / 2, height / 2, 200, 200);
  } else if (currentStep === 1) {
    // Alternative 1: Spread athletes
    fill(200, 100, 150);
    rect(width / 4, height / 4, 200, 200);
  } else if (currentStep === 2) {
    // Alternative 2: Spread queer community
    fill(150, 200, 100);
    triangle(width / 2, height / 4, width / 4, height * 0.75, width * 0.75, height * 0.75);
  }
}

// Track scroll position and update visualization
function updateVisualization() {
  const scrollPosition = window.scrollY;
  const stepElements = document.querySelectorAll('.step');

  stepElements.forEach((step, index) => {
    const stepTop = step.offsetTop;
    const stepHeight = step.offsetHeight;

    if (scrollPosition >= stepTop && scrollPosition < stepTop + stepHeight) {
      if (currentStep !== index) {
        currentStep = index;
        redraw(); // Redraw the p5.js sketch
      }
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', updateVisualization);