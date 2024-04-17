let font;

// module aliases
let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Events = Matter.Events;

let engine;
let box1;

let canvas;
let ctx;

let boat;
let boatImg;

var x, y, z;

let deviceRotation = {
  x: 0,
  y: 0,
};

let minTiltX = -90;
let maxTiltX = 90;
let minTiltY = -90;
let maxTiltY = 90;

let centerVector;

let loopCount = 0;

function handleOrientation(event) {
  x = event.gamma; // In degree in the range [-90,90]
  y = event.beta; // In degree in the range [-180,180]
  z = event.alpha; //??

  //gravity
  //updateXYZInfoBox(x, y, z);

  const scale = 0.02;
  //engine.gravity.y = y * scale;
  //engine.gravity.x = x * scale;

  engine.gravity.x = x;
  engine.gravity.y = y;
  engine.gravity.scale = 0.00001;

  //rotate works, but not that cool
  //game.angle = z * 2 * Math.PI / 360;
}

function updateXYZInfoBox(x, y, z) {
  document.getElementById("gamma").innerHTML = Math.round(x);
  document.getElementById("beta").innerHTML = Math.round(y);
  document.getElementById("alpha").innerHTML = Math.round(z);
}

window.addEventListener("deviceorientation", handleOrientation);

function preload() {
  font = loadFont("assets/dinpro-light.otf");
}

function setup() {
  //   canvas = document.getElementById("canvas");
  //   ctx = canvas.getContext("2d");

  createCanvas(windowWidth, windowHeight);
  noStroke();

  generateWaves();

  angleMode(DEGREES);
  centerVector = createVector(windowWidth / 2, windowHeight / 2);

  boatImg = loadImage("assets/boat.png"); // Load the image

  engine = Engine.create();

  engine.gravity.x = 0;
  engine.gravity.y = 0;

  var render = Render.create({
    element: document.body,
    engine: engine,
  });

  // box functions as boat position placeholder
  box1 = Bodies.rectangle(windowWidth / 2, windowHeight / 2, 40, 60, {
    frictionAir: 0.02,
  });

  boat = new Boat(box1.x, box1.y); // p5js boat image

  Composite.add(engine.world, box1);

  //Render.run(render);

  var runner = Runner.create();

  Runner.run(runner, engine);

  Events.on(runner, "tick", function (event) {
    if (box1.position.x > windowWidth) {
      Matter.Body.set(box1, "position", { x: 0, y: box1.position.y });
    } else if (box1.position.x < 0) {
      Matter.Body.set(box1, "position", { x: windowWidth, y: box1.position.y });
    }

    if (box1.position.y > windowHeight) {
      Matter.Body.set(box1, "position", { x: box1.position.x, y: 0 });
    } else if (box1.position.y < 0) {
      Matter.Body.set(box1, "position", { x: box1.position.x, y: windowHeight });
    }
  });
}

function getRotation() {
  let rotX = rotationX;
  let rotY = rotationY;

  rotX = round(rotX, 2);
  rotY = round(rotY, 2);

  //   if (rotX > 80) {
  //     rotX = 80;
  //   }

  //   if (rotX < -80) {
  //     rotX = -90;
  //   }

  //   if (rotY > 80) {
  //     rotY = 80;
  //   }

  //   if (rotY < -80) {
  //     rotY = -80;
  //   }

  return {
    x: rotX,
    y: rotY,
  };
}

function drawTargetDot(gravityPoint) {
  resetMatrix();

  fill(255, 0, 0);
  circle(gravityPoint.x, gravityPoint.y, 10);

  line(windowWidth / 2, windowHeight / 2, gravityPoint.x, gravityPoint.y);
  stroke(126);
}

function getGravityPoint(deviceRotationX, deviceRotationY) {
  let x = map(deviceRotationY, minTiltY, maxTiltX, 0, windowWidth);
  let y = map(deviceRotationX, minTiltX, maxTiltX, 0, windowHeight);

  return {
    x,
    y,
  };
}

function getGravityAngle(gravityPoint) {
  let gravityPointVector = createVector(gravityPoint.x, gravityPoint.y);

  let v3 = p5.Vector.sub(gravityPointVector, centerVector);
  let angle = v3.heading();

  return angle;
}

function draw() {
  background(20);

  drawWaves();

  fill(255, 0, 0);
  //   ellipse(box1.position.x, box1.position.y, 20, 20);

  deviceRotation = getRotation();

  let gravityPoint = getGravityPoint(deviceRotation.x, deviceRotation.y);
  //drawTargetDot(gravityPoint);
  let angle = getGravityAngle(gravityPoint);

  boat.updatePos(box1.position.x, box1.position.y);

  if (loopCount > 20) {
    boat.findNearestWaveParticle(waveParticles);
    boat.moveWithWave();
  }

  boat.updateAngle(angle);
  boat.draw();

  loopCount++;
}
