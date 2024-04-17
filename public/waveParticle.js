class WaveParticle {
  constructor(size, color, x, y, xOffset, YOffset) {
    this.x = 0;
    this.y = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.xOffset = xOffset;
    this.YOffset = YOffset;
    this.gridPosX = x;
    this.gridPosY = y;
    this.angle = 0;
    this.color = color;
    this.size = size;
  }

  updatePos(
    t,
    waveAngleX,
    waveAngleY,
    waveXOffSetMin,
    waveXOffSetMax,
    waveYOffSetMin,
    waveYOffSetMax
  ) {
    const xAngle = map(waveAngleX, 0, width, waveXOffSetMin * PI, waveXOffSetMax * PI, true);
    const yAngle = map(waveAngleY, 0, height, waveYOffSetMin * PI, waveYOffSetMax * PI, true);
    // and also varies based on the particle's location
    this.angle = xAngle * (this.gridPosX / width) + yAngle * (this.gridPosY / height);

    this.prevX = this.x;
    this.prevY = this.y;

    // each particle moves in a circle
    this.x = this.gridPosX + 15 * cos(2 * PI * t + this.angle);
    this.y = this.gridPosY + 15 * sin(2 * PI * t + this.angle);
  }

  draw() {
    ellipse(this.x + this.xOffset, this.y + this.YOffset, this.size); // draw particle
  }
}
