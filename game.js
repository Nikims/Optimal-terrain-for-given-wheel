stage = 0;
isMouseP = false;
pointsOfCurve = [];
axle = { x: 94245, y: 0 };
pointsOfRoad = [];
function update() {
  if (isMouseP && stage == 0) {
    pointsOfCurve.push({
      x: mouseX,
      y: mouseY,
      distToAxle: 645356,
      angleToAxle: 856783,
    });
  }
  if (pointsOfCurve.length > 0 && !isMouseP && stage == 0) {
    stage++;
  }
}
degreesOfRotation = 0;
lowestPointDist = null;
offset = 0;
function draw() {
  pointsOfRoad.push({ x: degreesOfRotation, y: lowestPointDist });
  context.fillStyle = "rgb(100,100,100)";
  context.fillRect(0, 0, 1920, 1080);
  context.font = "20px Ariel";
  context.fillStyle = "red";
  for (i = 1; i < pointsOfRoad.length; i++) {
    drawLine(
      pointsOfRoad[i].x * 100,
      pointsOfRoad[i].y + axle.y,
      pointsOfRoad[i - 1].x * 100,
      pointsOfRoad[i - 1].y + axle.y
    );
  }
  if (axle.x != 94245) {
    // console.log("el");
    offset = axle.x;
    if (degreesOfRotation < 6.28) {
      degreesOfRotation += 0.01;
    } else {
      degreesOfRotation = 0.1;
    }
    for (let i = 0; i < pointsOfCurve.length; i++) {
      if (
        pointsOfCurve[i].distToAxle == 645356 &&
        pointsOfCurve[i].angleToAxle == 856783
      ) {
        pointsOfCurve[i].distToAxle = Math.hypot(
          pointsOfCurve[i].x - axle.x,
          pointsOfCurve[i].y - axle.y
        );

        pointsOfCurve[i].angleToAxle = Math.atan2(
          pointsOfCurve[i].y - axle.y,
          pointsOfCurve[i].x - axle.x
        );
      }
      pointsOfCurve[i].x =
        axle.x +
        pointsOfCurve[i].distToAxle *
          Math.cos(pointsOfCurve[i].angleToAxle + degreesOfRotation);
      pointsOfCurve[i].y =
        axle.y +
        pointsOfCurve[i].distToAxle *
          Math.sin(pointsOfCurve[i].angleToAxle + degreesOfRotation);
      if (pointsOfCurve[i].angleToAxle + degreesOfRotation > 6.28) {
        effectiveAngle =
          pointsOfCurve[i].angleToAxle + degreesOfRotation - 6.28;
      } else {
        effectiveAngle = pointsOfCurve[i].angleToAxle + degreesOfRotation;
      }
      if (Math.abs(effectiveAngle - 3.14 / 2) < 0.01) {
        lowestPointDist = pointsOfCurve[i].distToAxle;
      }
    }
    context.fillRect(axle.x + degreesOfRotation * 100 - offset, axle.y, 10, 10);
    context.fillRect(
      axle.x +
        lowestPointDist * Math.cos(3.14 / 2) +
        degreesOfRotation * 100 -
        offset,
      axle.y + lowestPointDist * Math.sin(3.14 / 2),
      10,
      10
    );
  }
  context.fillStyle = "white";

  if (!stage) {
    context.fillText("Please draw your closed loop", 300, 40);
  }
  if (stage == 1) {
    context.fillText("Please place your axle", 300, 40);
  }
  context.strokeStyle = "turquoise  ";

  for (let i = 1; i < pointsOfCurve.length; i++) {
    drawLine(
      pointsOfCurve[i - 1].x + degreesOfRotation * 100 - offset,
      pointsOfCurve[i - 1].y,
      pointsOfCurve[i].x + degreesOfRotation * 100 - offset,
      pointsOfCurve[i].y
    );
  }
}
function mouseup() {
  isMouseP = false;
  if (stage == 1) {
    axle.x = mouseX;
    axle.y = mouseY;
    stage++;
  }
}
function mousedown() {
  isMouseP = true;
}
