let currentStep = 0;
let allDots = [];
let houseDots = { A: [], B: [], C: [], D: [] };
let dotRadius = 5;
let cols = 25; // for layout of undergrad cluster
let rows = 20;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("canvas-1");
  generateDots();
  noLoop();
  drawStep(currentStep);
}

function generateDots() {
  allDots = [];
  for (let i = 0; i < 500; i++) {
    let x = 100 + (i % cols) * (dotRadius * 2 + 2);
    let y = 100 + Math.floor(i / cols) * (dotRadius * 2 + 2);
    allDots.push({ x, y, color: color("orange"), moved: false });
  }
}

function distributeDots() {
  // color 125 dots blue
  let blueIndices = [...Array(500).keys()].sort(() => 0.5 - Math.random()).slice(0, 125);
  for (let i = 0; i < blueIndices.length; i++) {
    const idx = blueIndices[i];
    allDots[idx].color = color("blue");
  }

  // Assign 112 blue dots to House A
  let houseACount = 0;
  for (let i = 0; i < 125; i++) {
    const idx = blueIndices[i];
    let dot = allDots[idx];

    if (houseACount < 112) {
      houseDots.A.push(dot);
      houseACount++;
    } else {
      // assign randomly to B, C, D
      const houses = ["B", "C", "D"];
      const house = random(houses);
      houseDots[house].push(dot);
    }
    dot.moved = true;
  }
}

function drawStep(step) {
  background(255);
  textSize(16);
  noStroke();

  // Draw undergrad cluster label
  fill(0);
  text("Undergraduates", 100, 60);

  // Draw house circles and labels
  let houseX = width - 200;
  let houseYStart = 100;
  let spacing = 90;
  let houseKeys = ["A", "B", "C", "D"];

  for (let i = 0; i < houseKeys.length; i++) {
    let y = houseYStart + i * spacing;
    stroke(0);
    noFill();
    ellipse(houseX, y, 80);
    noStroke();
    fill(0);
    textAlign(CENTER);
    text("House " + houseKeys[i], houseX, y + 50);
  }

  if (step === 0) {
    // Just draw all orange dots in place
    for (let dot of allDots) {
      fill(dot.color);
      ellipse(dot.x, dot.y, dotRadius * 2);
    }
  } else if (step === 1) {
    // Color and distribute blue dots to houses
    distributeDots();
    for (let dot of allDots) {
      if (dot.moved) continue; // don't draw blue dots here
      fill(dot.color);
      ellipse(dot.x, dot.y, dotRadius * 2);
    }
    drawHouseDots();
  }
}

function drawHouseDots() {
  let houseCenters = {
    A: { x: width - 200, y: 100 },
    B: { x: width - 200, y: 190 },
    C: { x: width - 200, y: 280 },
    D: { x: width - 200, y: 370 }
  };

  for (let h in houseDots) {
    for (let i = 0; i < houseDots[h].length; i++) {
      let dot = houseDots[h][i];
      let angle = (i / houseDots[h].length) * TWO_PI;
      let r = 30;
      dot.x = houseCenters[h].x + r * cos(angle);
      dot.y = houseCenters[h].y + r * sin(angle);
      fill(dot.color);
      ellipse(dot.x, dot.y, dotRadius * 2);
    }
  }
}

// Scroll-triggered
const steps = document.querySelectorAll(".step");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const step = Number(entry.target.dataset.step);
        currentStep = step;
        drawStep(currentStep);
      }
    });
  },
  { threshold: 0.5 }
);

steps.forEach((step) => observer.observe(step));