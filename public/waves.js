let t = 0; // time variable

spaceBetweenX = 0;
spaceBetweenY = 0;

let waveAngleX = 100;
let waveAngleY = 50;

let waveSpeed = 0.007;

let waveOffSet = 0;

let waveParticles = [];

function generateWaves() {
  // mobile layout
  if (windowWidth < windowHeight) {
    spaceBetweenX = windowWidth / 16.5;
    spaceBetweenY = windowHeight / 19;
    waveOffSet = round(windowWidth / 80);
    waveAngleX = windowWidth / 4;
    waveAngleY = windowHeight / 13;
  } else {
    spaceBetweenX = windowWidth / 23 - 3;
    spaceBetweenY = windowHeight / 16.5 - 3;
    waveOffSet = round(windowWidth / 130);
    waveAngleX = windowWidth / 13;
    waveAngleY = windowHeight / 4;
  }

  // make a x and y grid of ellipses
  for (let x = 0; x <= width + spaceBetweenX * 3; x = x + spaceBetweenX) {
    for (let y = 0; y <= height + spaceBetweenY * 3; y = y + spaceBetweenY) {
      let xOffset = random(-10, 10);
      let YOffset = random(-10, 10);
      xOffset = 0;
      YOffset = 0;
      let waveParticle = new WaveParticle(2, 255, x, y, xOffset, YOffset);
      waveParticles.push(waveParticle);
    }
  }
}

function drawWaves() {
  angleMode(RADIANS);
  fill(255);

  for (let i = 0; i < waveParticles.length; i++) {
    waveParticles[i].updatePos(
      t,
      waveAngleX,
      waveAngleY,
      0 - waveOffSet,
      0 + waveOffSet,
      0 - waveOffSet,
      0 + waveOffSet
    );

    waveParticles[i].draw();
  }

  t = t + waveSpeed; // update time
}
