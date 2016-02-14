function drawBranch(length) {

  if (length < 5) {
    return;
  }
  console.log(length);

  // this branch
  myTurtle.moveForward(length);

  // left child
  myTurtle.pushState();
  myTurtle.turnLeft(45);
  drawBranch(length * 0.75);
  myTurtle.popState();

  // right child
  myTurtle.pushState();
  myTurtle.turnRight(45);
  drawBranch(length * 0.75);
  myTurtle.popState();

  if (length * 0.75 < 5) {
    myTurtle.image(leafImage, 10, 10);
  }

}

function drawLeaf() {
  myTurtle.pushState();

  myTurtle.turnLeft(45);

  for (i = 0; i < 5; i++) {
    myTurtle.moveForward(3);
    myTurtle.turnLeft(18);
  }
  myTurtle.turnLeft(90);
  for (i = 0; i < 5; i++) {
    myTurtle.moveForward(3);
    myTurtle.turnLeft(18);
  }

  myTurtle.popState();
}

function interesting() {
  myTurtle.penUp();
  myTurtle.moveTo(320, 180);
  myTurtle.turnTo(0);
  myTurtle.penDown();

  var t = random(-10, 10);
  var t2 = random(-0.5, 0.5);
  var d = random(-5, 5);
  for (var i = 0; i < 100; i++) {
    stroke(255, 0, 0, dist(320, 180, myTurtle.x, myTurtle.y) * 0.5);
    myTurtle.moveForward(d);
    myTurtle.turnRight(t + i * t2);
  }
}
