// Get the canvas and 2D rendering context
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Set the dimensions of the canvas
canvas.width = 1024;
canvas.height = 576;

// Gravity value affecting the player's vertical movement
const gravity = 0.5;

// Player class definition
class Player {
  constructor() {
    // Player speed and initial position
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    // Player velocity, width, and height
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }

  // Method to draw the player on the canvas
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // Method to update the player's position and handle gravity
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Apply gravity if the player is not on the ground
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}

// Platform class definition
class Platform {
  constructor({ x, y, image }) {
    // Platform position, image, width, and height
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  // Method to draw the platform on the canvas
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// GenericObject class definition (used for background images)
class GenericObject {
  constructor({ x, y, image }) {
    // Object position, image, width, and height
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  // Method to draw the generic object on the canvas
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// Image loading code
const image = new Image();
image.src = "./img/platform.png";

const background = new Image();
background.src = "./img/background.png";

const hills = new Image();
hills.src = "./img/hills.png";

const smallTall = new Image();
smallTall.src = "./img/platformSmallTall.png";

// Player, platforms, and generic objects initialization
let player = new Player();
let platforms = [];
let genericObjects = [];

// Keyboard input handling
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

// Variable to track horizontal scrolling
let scrollOffset = 0;

// Function to initialize the game state
function init() {
  player = new Player();
  platforms = [
    // Platform instances
    new Platform({ x: image.width * 4 + 300 - 2 + image.width - smallTall.width, y: 270, image: smallTall }),
    new Platform({ x: -1, y: 470, image }),
    new Platform({ x: image.width - 3, y: 470, image }),
    new Platform({ x: image.width * 2 + 100, y: 470, image }),
    new Platform({ x: image.width * 3 + 300, y: 470, image }),
    new Platform({ x: image.width * 4 + 300 - 2, y: 470, image }),
    new Platform({ x: image.width * 4 + 300 - 2, y: 470, image }),
    new Platform({ x: image.width * 5 + 700 - 2, y: 470, image }),
  ];

  genericObjects = [
    // GenericObject instances
    new GenericObject({
      x: -1,
      y: -1,
      image: background,
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: hills,
    }),
  ];

  scrollOffset = 0;
}

// Main animation loop
function animate() {
  requestAnimationFrame(animate);

  // Clear the canvas
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // Draw background images
  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  // Draw platforms
  platforms.forEach((platform) => {
    platform.draw();
  });

  // Update and draw the player
  player.update();

  // Handle player movement and scrolling
  if (keys.right.pressed && player.position.x < 500) {
    player.velocity.x = player.speed;
  } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    // Scroll background and platforms
    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }

  // Platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // Check win and lose conditions
  if (scrollOffset > image.width * 5 + 700 - 2) {
    console.log("you win");
  }
  if (player.position.y > canvas.height) {
    init();
    console.log("you lose");
  }
}

// Initialize the game state and start the animation loop
init();
animate();

// Event listeners for keyboard input
window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;

    case 87:
      console.log("up");
      player.velocity.y -= 15;
      break;
  }

  console.log(keys.right.pressed);
});

window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;

    case 87:
      console.log("up");
      break;
  }

  console.log(keys.right.pressed);
});