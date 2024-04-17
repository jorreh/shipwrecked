class Boat {
  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.angle = 0;
    this.nearestWaveParticle = new WaveParticle(2, 255, 0, 0, 0, 0);
  }

  updatePos(x, y) {
    this.x = x;
    this.y = y;
  }

  updateAngle(angle) {
    this.angle = angle;
  }

  findNearestWaveParticle(waveParticles) {
    let latchDistance = 10;

    for (let i = 0; i < waveParticles.length; i++) {
      let particleXDistanceFromBoat = this.x - waveParticles[i].x;
      let particleYDistanceFromBoat = this.y - waveParticles[i].y;

      particleXDistanceFromBoat = this.invertIfSmallerThanZero(particleXDistanceFromBoat);
      particleYDistanceFromBoat = this.invertIfSmallerThanZero(particleYDistanceFromBoat);

      let prevParticleXDistanceFromBoat = this.x - this.nearestWaveParticle.x;
      let prevParticleYDistanceFromBoat = this.y - this.nearestWaveParticle.y;

      prevParticleXDistanceFromBoat = this.invertIfSmallerThanZero(prevParticleXDistanceFromBoat);
      prevParticleYDistanceFromBoat = this.invertIfSmallerThanZero(prevParticleYDistanceFromBoat);

      let particleDiffX = particleXDistanceFromBoat - prevParticleXDistanceFromBoat;
      let particleDiffY = particleYDistanceFromBoat - prevParticleYDistanceFromBoat;

      particleDiffX = this.invertIfSmallerThanZero(particleDiffX);
      particleDiffY = this.invertIfSmallerThanZero(particleDiffY);

      if (particleDiffX < latchDistance && particleDiffY < latchDistance) {
        this.nearestWaveParticle = waveParticles[i];
      }
    }
  }

  invertIfSmallerThanZero(value) {
    if (value < 0) {
      return (value *= -1);
    } else {
      return value;
    }
  }

  moveWithWave() {
    let wavepartDiffX = this.nearestWaveParticle.x - this.nearestWaveParticle.prevX;
    let wavepartDiffY = this.nearestWaveParticle.y - this.nearestWaveParticle.prevY;
    Matter.Body.set(box1, "position", {
      y: box1.position.y - wavepartDiffY,
      x: box1.position.x - wavepartDiffX,
    });
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + 90);
    imageMode(CENTER);
    image(boatImg, 0, 0, boatImg.width / 5, boatImg.height / 5);
    pop();
  }
}
