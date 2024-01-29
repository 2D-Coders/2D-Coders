import "../../flappyBird/style.css";
import { useEffect, useState } from "react";
import BackDropImg from "../components/BackDropImg";
import CloseBtn from "../components/CloseBtn";
import NavBar from "../components/NavBar";
import axios from "axios";
import bgSound from "../../public/Sounds/samuraiChamploo.mp3";
import flappyScore from "../../public/Sounds/flappyScore.mp3";
import flappyDeath from "../../public/Sounds/flappyDeath.mp3";

const FlappyBird = () => {
  const [audio] = useState(() => new Audio(bgSound));
  const [scoreAudio] = useState(() => new Audio(flappyScore));
  const [deathAudio] = useState(() => new Audio(flappyDeath));
  const [gameStarted, setGameStarted] = useState(false);
  const [highscores, setHighscores] = useState([]);
  const [captureScore, setCaptureScore] = useState(0);
  const [postHS, setPostHS] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [user, setUser] = useState("");

  const toggleAudio = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getMe();
  }, []);

  useEffect(() => {
    const getHighscores = async () => {
      try {
        const response = await axios.get("/api/highscores");
        setHighscores(response.data);
      } catch (error) {
        console.error("Error fetching highscores:", error);
      }
    };

    getHighscores();
  }, [postHS]);

  const openPostHs = async () => {
    try {
      await axios.post("/api/highscores", {
        gameId: 1,
        score: captureScore,
        userId: user.id,
      });
      setPostHS((prevPostHS) => !prevPostHS);
    } catch (error) {
      console.error("Error posting highscore:", error);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  //board
  let board;
  let boardWidth = 360;
  let boardHeight = 640;
  let context;

  //bird
  let birdWidth = 34; //width/height ratio = 408/228 = 17/12
  let birdHeight = 24;
  let birdX = boardWidth / 8;
  let birdY = boardHeight / 2;
  let birdImg;

  let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
  };

  //pipes
  let pipeArray = [];
  let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
  let pipeHeight = 512;
  let pipeX = boardWidth;
  let pipeY = 0;

  let topPipeImg;
  let bottomPipeImg;

  //physics
  let velocityX = -2; //pipes moving left speed
  let velocityY = 0; //bird jump speed
  let gravity = 0.4;

  let gameOver = false;
  let score = 0;

  useEffect(() => {
    if (gameStarted) {
      // window.onload = function () {
      board = document.getElementById("flappyBoard");
      board.height = boardHeight;
      board.width = boardWidth;
      context = board.getContext("2d"); //used for drawing on the board

      //load images
      birdImg = new Image();
      birdImg.src = "../../flappyBird/flappybird.png";
      birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
      };

      topPipeImg = new Image();
      topPipeImg.src = "../../flappyBird/toppipe.png";

      bottomPipeImg = new Image();
      bottomPipeImg.src = "../../flappyBird/bottompipe.png";

      requestAnimationFrame(update);
      setInterval(placePipes, 1500);
      document.addEventListener("keydown", moveBird);
    }
  }, [gameStarted]);

  function update() {
    requestAnimationFrame(update);
    if (gameOver) {
      return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
      gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
      let pipe = pipeArray[i];
      pipe.x += velocityX;
      context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

      if (!pipe.passed && bird.x > pipe.x + pipe.width) {
        score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
        pipe.passed = true;
        scoreAudio.currentTime = 0; // Set currentTime to 0 before playing
        scoreAudio.play();
      }

      if (detectCollision(bird, pipe)) {
        gameOver = true;
      }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
      pipeArray.shift(); //removes first element from the array
    }

    //score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
      deathAudio.currentTime = 0; // Set currentTime to 0 before playing
      deathAudio.play();
      setPostHS(true);
      setCaptureScore(score);
      context.fillText("GAME OVER", 5, 90);
    }
  }

  function placePipes() {
    if (gameOver) {
      return;
    }

    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;

    let topPipe = {
      img: topPipeImg,
      x: pipeX,
      y: randomPipeY,
      width: pipeWidth,
      height: pipeHeight,
      passed: false,
    };
    pipeArray.push(topPipe);

    let bottomPipe = {
      img: bottomPipeImg,
      x: pipeX,
      y: randomPipeY + pipeHeight + openingSpace,
      width: pipeWidth,
      height: pipeHeight,
      passed: false,
    };
    pipeArray.push(bottomPipe);
  }

  function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
      //jump
      velocityY = -6;

      //reset game
      if (gameOver) {
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
      }
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

  const closePostHs = () => {
    setPostHS(false);
  };

  return (
    <section className="container-center center-vertical w-screen h-screen">
      <NavBar />
      <h1 className="bg-white p-4 rounded-lg mb-4 text-black">Flappy Bird</h1>

      <div className="m-8 relative px-12 py-28 rounded-lg" id="flappyBg">
        <div className="flex items-center gap-20">
          <div className="bg-black w-96 h-96 p-6 rounded-lg">
            <h1 className="mb-2">How To Play</h1>
            <hr />
            <br />
            <ul className="leading-loose text-left">
              <li>Press Spacebar to jump</li>
              <li>Don't hit the pipes</li>
              <li>Don't fall off the screen</li>
              <li>Get the highest score!</li>
            </ul>
          </div>
          <button
            onClick={toggleAudio}
            className="btn-white animate-bounce text-2xl"
          >
            {playing ? "PAUSE" : "PLAY LOFI MUSIC"}
          </button>
          <canvas
            id="flappyBoard"
            style={{
              border: "1px solid #000",
              display: "block",
              margin: "0 auto",
            }}
            tabIndex="0"
          ></canvas>
          <section>
            {postHS ? (
              <div className="bg-white p-4 rounded-lg mb-4 text-black w-96">
                <h1 className="text-xl">Post A High Score</h1>
                <div className="flex gap-4 justify-center items-center ">
                  <button
                    onClick={openPostHs}
                    className="btn-black bg-green-700"
                  >
                    Yes
                  </button>
                  <button
                    onClick={closePostHs}
                    className="btn-black bg-red-700"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : null}
            <div className="bg-black w-96 h-96 p-6 rounded-lg overflow-y-scroll">
              <h1 className="mb-2">Highscores</h1>
              <hr />
              <br />
              <div>
                <section>
                  {highscores.map((highscore) => (
                    <div key={highscore.id}>
                      {highscore.gameId === 1 ? (
                        <h1>{highscore.score}</h1>
                      ) : null}
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </section>
        </div>
        <CloseBtn />
      </div>
      <button onClick={startGame} className="btn-white animate-bounce text-2xl">
        PLAY
      </button>

      <BackDropImg />
    </section>
  );
};

export default FlappyBird;
