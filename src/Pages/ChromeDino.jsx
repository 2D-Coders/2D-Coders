import { useEffect, useState } from "react";
import "../../chromeDino/style.css";
import BackDropImg from "../components/BackDropImg";
import CloseBtn from "../components/CloseBtn";
import NavBar from "../components/NavBar";
import axios from "axios";

const ChromeDino = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [highscores, setHighscores] = useState([]);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const getHighscores = async () => {
      const response = await axios.get("/api/highscores");
      setHighscores(response.data);
      console.log(response.data);
    };
    getHighscores();
  }, []);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const response = await axios.get("/api/users");
  //     setUser(response.data);
  //   };
  //   getUser();
  // }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  //board
  let board;
  let boardWidth = 750;
  let boardHeight = 250;
  let context;

  //dino
  let dinoWidth = 88;
  let dinoHeight = 94;
  let dinoX = 50;
  let dinoY = boardHeight - dinoHeight;
  let dinoImg;

  let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight,
  };

  //cactus
  let cactusArray = [];

  let cactus1Width = 34;
  let cactus2Width = 69;
  let cactus3Width = 102;

  let cactusHeight = 70;
  let cactusX = 700;
  let cactusY = boardHeight - cactusHeight;

  let cactus1Img;
  let cactus2Img;
  let cactus3Img;

  //physics
  let velocityX = -8; //cactus moving left speed
  let velocityY = 0;
  let gravity = 0.4;

  let gameOver = false;
  let score = 0;

  useEffect(() => {
    if (gameStarted) {
      board = document.getElementById("chromeBoard");
      board.height = boardHeight;
      board.width = boardWidth;

      context = board.getContext("2d"); //used for drawing on the board

      //draw initial dinosaur
      // context.fillStyle="green";
      // context.fillRect(dino.x, dino.y, dino.width, dino.height);

      dinoImg = new Image();
      dinoImg.src = "../../chromeDino/img/dino.png";
      dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
      };

      cactus1Img = new Image();
      cactus1Img.src = "../../chromeDino/img/cactus1.png";

      cactus2Img = new Image();
      cactus2Img.src = "../../chromeDino/img/cactus2.png";

      cactus3Img = new Image();
      cactus3Img.src = "../../chromeDino/img/cactus3.png";

      requestAnimationFrame(update);
      setInterval(placeCactus, 1000); //1000 milliseconds = 1 second
      document.addEventListener("keydown", moveDino);
    }
  }, [gameStarted]);

  function update() {
    requestAnimationFrame(update);
    if (gameOver) {
      return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
      let cactus = cactusArray[i];
      cactus.x += velocityX;
      context.drawImage(
        cactus.img,
        cactus.x,
        cactus.y,
        cactus.width,
        cactus.height
      );

      if (detectCollision(dino, cactus)) {
        gameOver = true;
        dinoImg.src = "../../chromeDino/img/dino-dead.png";
        dinoImg.onload = function () {
          context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
        };
      }
    }

    //score
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
  }

  function moveDino(e) {
    if (gameOver) {
      if (e.code === "Space") {
        // Reload the page if space bar is pressed and the game is over
        location.reload();
      }
      return;
    }
    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
      //jump
      velocityY = -10;
    } else if (e.code == "ArrowDown" && dino.y == dinoY) {
      //duck
    }
  }

  function placeCactus() {
    if (gameOver) {
      return;
    }

    //place cactus
    let cactus = {
      img: null,
      x: cactusX,
      y: cactusY,
      width: null,
      height: cactusHeight,
    };

    let placeCactusChance = Math.random(); //0 - 0.9999...

    if (placeCactusChance > 0.9) {
      //10% you get cactus3
      cactus.img = cactus3Img;
      cactus.width = cactus3Width;
      cactusArray.push(cactus);
    } else if (placeCactusChance > 0.7) {
      //30% you get cactus2
      cactus.img = cactus2Img;
      cactus.width = cactus2Width;
      cactusArray.push(cactus);
    } else if (placeCactusChance > 0.5) {
      //50% you get cactus1
      cactus.img = cactus1Img;
      cactus.width = cactus1Width;
      cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
      cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
  }

  function detectCollision(a, b) {
    return (
      a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
      a.x + a.width > b.x && //a's top right corner passes b's top left corner
      a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
      a.y + a.height > b.y
    ); //a's bottom left corner passes b's top left corner
  }

  return (
    <section className="container-center center-vertical w-screen h-screen">
      <NavBar />
      <h1 className="bg-white p-4 rounded-lg mb-4 text-black">Chrome Dino</h1>
      <div className="m-8 relative px-28 py-12 rounded-lg" id="chromeDino">
        <div className="flex flex-col items-center gap-20">
          <canvas id="chromeBoard"></canvas>
          <section className="flex gap-20">
            <div className="bg-black w-96 h-96 p-6 rounded-lg">
              <h1 className="mb-2">How To Play</h1>

              <hr />
              <br />
              <ul className="leading-loose text-left">
                <li>Press spacebar to jump</li>
                <li>Avoid hitting the cactus</li>
                <li>Earn points by surviving</li>
              </ul>
            </div>
            <div className="bg-black w-96 h-96 p-6 rounded-lg">
              <h1 className="mb-2">Highscores</h1>
              <hr />
              <br />
              <div>
                <section>
                  {highscores.map((highscore) => (
                    <div key={highscore.id}>
                      {highscore.gameId === 3 ? (
                        <h1>{highscore.score}</h1>
                      ) : null}
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </section>
          <CloseBtn />
        </div>
      </div>
      <button onClick={startGame} className="btn-white animate-bounce text-2xl">
        PLAY
      </button>

      <BackDropImg />
    </section>
  );
};

export default ChromeDino;
