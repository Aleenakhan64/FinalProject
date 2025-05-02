let trash = [];
let fish = [];
let facts = [
  "Plastic takes 500 years to decompose!",
  "Over 100,000 marine animals die each year from plastic.",
  "Plastic bags look like jellyfish to turtles.",
  "1 million seabirds die yearly from plastic pollution.",
  "Only 9% of plastic ever produced has been recycled."
];
let factToShow = "";
let factTimer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");

  // Create trash
  for (let i = 0; i < 8; i++) {
    trash.push(new Trash(random(width), random(height)));
  }

  // Create fish
  for (let i = 0; i < 5; i++) {
    fish.push(new Fish(random(width), random(height)));
  }
}

function draw() {
  background(0, 150, 255); // Ocean blue (clear the previous frame)

  // Draw and move trash
  for (let t of trash) {
    t.move();
    t.display();
  }

  // Draw and move fish
  for (let f of fish) {
    f.move();
    f.display();
  }

  // Show fact if available
  if (factTimer > 0) {
    fill(255);
    textSize(16);
    text(factToShow, 20, height - 20);
    factTimer--;
  }

  // Title
  fill(255);
  textSize(14);
  text("Click on trash to clean it up and learn a fact!", 20, 50);
}

function mousePressed() {
  for (let i = trash.length - 1; i >= 0; i--) {
    if (trash[i].isClicked(mouseX, mouseY)) {
      factToShow = random(facts);
      factTimer = 200;
      trash.splice(i, 1); // remove clicked trash
      break;
    }
  }
}

class Trash {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speed = random(0.3, 1);
  }

  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
    fill(0);
    textSize(10);
    text("🗑", this.x - 5, this.y + 3);
  }

  isClicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }
}

class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(1, 2);
  }

  move() {
    this.x += this.speed;
    if (this.x > width) {
      this.x = 0;
      this.y = random(height);
    }
  }

  display() {
    fill(255, 200, 0);
    ellipse(this.x, this.y, 30, 15);
    triangle(this.x - 15, this.y, this.x - 25, this.y - 5, this.x - 25, this.y + 5);
  }
}
