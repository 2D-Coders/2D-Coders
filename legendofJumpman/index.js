//board
let board;
let boardWidth = 360;
let boardHeight = 576;
let context;

//doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth / 2 - doodlerWidth / 2;
let doodlerY = (boardHeight * 7) / 8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

//physics

let velocityX = 0;
let velocityY = 0; // doodler jump speedd
let initialVelocityY = -8; // starting velocity y
let gravity = 0.4;

//platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

let doodler = {
  img: null,
  x: doodlerX,
  y: doodlerY,
  width: doodlerWidth,
  height: doodlerHeight,
};

let score = 0;
let maxScore = 0;
let gameOver = false;

let disappearingPlatforms = [];
let invisibleDuration = 5000; // 5 seconds in milliseconds
let nextDisappearanceTime = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); //used for drawing on the board

  //draw doodler
  //load images
  doodlerRightImg = new Image();
  doodlerRightImg.src = "./Untitled2.png";
  doodler.img = doodlerRightImg;
  doodlerRightImg.onload = function () {
    context.drawImage(
      doodler.img,
      doodler.x,
      doodler.y,
      doodler.width,
      doodler.height
    );
  };

  doodlerLeftImg = new Image();
  doodlerLeftImg.src = "./Untitled.png";

  platformImg = new Image();
  platformImg.src = "./platform.png";

  velocityY = initialVelocityY;
  placePlatform();
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveDoodler);
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);
  //doodler
  doodler.x += velocityX;
  if (doodler.x > boardWidth) {
    doodler.x = 0;
  } else if (doodler.x + doodler.width < 0) {
    doodler.x = boardWidth;
  }

  velocityY += gravity;
  doodler.y += velocityY;
  if (doodler.y > board.height) {
    gameOver = true;
  }
  context.drawImage(
    doodler.img,
    doodler.x,
    doodler.y,
    doodler.width,
    doodler.height
  );

  //platforms
  for (let i = 0; i < platformArray.length; i++) {
    let platform = platformArray[i];

    if (detectCollision(doodler, platform) && velocityY >= 0) {
      velocityY = initialVelocityY; //jump off platform
    }

    // Only draw platform if visible
    if (platform.visible) {
      context.drawImage(
        platform.img,
        platform.x,
        platform.y,
        platform.width,
        platform.height
      );
    }

    // Move the platform horizontally
    platform.x += platform.velocityX;

    // Wrap the platform around the screen
    if (platform.x < -platform.width) {
      platform.x = boardWidth;
    } else if (platform.x > boardWidth) {
      platform.x = -platform.width;
    }

    // Check if it's time to make platforms disappear
    if (platform.disappearingTime <= Date.now()) {
      platform.visible = false;
    }
  }

  // Check if it's time to make platforms disappear
  if (Date.now() >= nextDisappearanceTime) {
    makePlatformsDisappear();
    nextDisappearanceTime = Date.now() + invisibleDuration;
  }

  //score
  updateScore();
  context.fillStyle = "blue";
  context.font = "16px sans-serif";
  context.fillText(score, 5, 20);

  if (gameOver) {
    context.fillText(
      "You lose. Hit space to restart!",
      boardWidth / 10,
      (boardHeight * 4) / 8
    );
  }
}

function makePlatformsDisappear() {
  // Randomly select platforms to disappear
  disappearingPlatforms = [];
  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * platformArray.length);
    let platform = platformArray[randomIndex];
    platform.visible = false;
    platform.disappearingTime = Date.now() + invisibleDuration; // Set the time when the platform will reappear
    disappearingPlatforms.push(platform);
  }
}

function moveDoodler(e) {
  if (e.code == "ArrowRight" || e.code == "KeyD") {
    //move right
    velocityX = 6;
    doodler.img = doodlerRightImg;
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    //move left
    velocityX = -6;
    doodler.img = doodlerLeftImg;
  } else if (e.code == "Space" && gameOver) {
    //reset
    doodler = {
      img: doodlerRightImg,
      x: doodlerX,
      y: doodlerY,
      width: doodlerWidth,
      height: doodlerHeight,
    };

    velocityX = 0;
    velocityY = initialVelocityY;
    score = 0;
    maxScore = 0;
    gameOver = false;
    placePlatform();
  }
}

function placePlatform() {
  platformArray = [];

  // Add one more platform at the bottom
  let bottomPlatform = {
    img: platformImg,
    x: boardWidth / 3, // Adjust the x position as needed
    y: boardHeight - platformHeight,
    width: platformWidth,
    height: platformHeight,
    velocityX: Math.random() > 0.5 ? 2 : -2, // Randomly choose initial horizontal velocity
    velocityY: 0,
    visible: true, // Set the bottom platform as always visible
  };
  platformArray.push(bottomPlatform);

  // Add other platforms with random positions and movements
  for (let i = 0; i < 6; i++) {
    let randomX = Math.floor((Math.random() * boardWidth * 3) / 4); //(0-1) * boardWidth*3/4

    // Ensure the platform is within the visible area of the screen
    if (randomX + platformWidth > boardWidth) {
      randomX = boardWidth - platformWidth;
    }

    let platformVelocityX = Math.random() > 0.5 ? 2 : -2; // Randomly choose direction
    let platformVelocityY = 0; // You can adjust the vertical movement if needed

    let platform = {
      img: platformImg,
      x: randomX,
      y: boardHeight - 75 * i - 150,
      width: platformWidth,
      height: platformHeight,
      velocityX: platformVelocityX,
      velocityY: platformVelocityY,
      visible: true, // By default, platforms are visible
    };

    platformArray.push(platform);
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width && //a's top left corner doesnt reach b's top right corner
    a.x + a.width > b.x && //a's top right corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y
  ); //a's bottom left corner passes b's top left corner
}

function updateScore() {
  let points = Math.floor(50 * Math.random()); // (0-1) * 50 --> (0-50)
  if (velocityY < 0) {
    //negative going up
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (velocityY >= 0) {
    maxScore -= points;
  }
}
