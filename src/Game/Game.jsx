import { useEffect, useRef, useState } from "react";
import ColouredBG from "../ColouredBG";
import GameClasses from "../stylesheets/game.module.css";
import { useParams } from "react-router-dom";
import Back from "../Back";

function Game() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const [playerMarkerStyle, setPlayerMarkerStyle] = useState({
    top: "0px",
    left: "0px",
  });
  const [answerMarkerStyle, setAnswerMarkerStyle] = useState({
    top: "100px",
    left: "100px",
  });
  const { level } = useParams();

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => setTime((time) => time + 1), 10);
    }

    return () => clearInterval(intervalId);
  }, [running]);

  const stopTimer = () => {
    setRunning(false);
  };

  // time is in hundreths of a second (1/100)
  const minutes = Math.floor(time / 6000)
    .toString()
    .padStart(2, 0);
  const seconds = Math.floor((time - minutes * 6000) / 100)
    .toString()
    .padStart(2, 0);
  const miliseconds = String(time - minutes * 6000 - seconds * 100)
    .slice(-2)
    .toString()
    .padStart(2, 0);

  let img;
  switch (level) {
    case "Snow Day":
      img = "../snow_day.jpg";
      break;
    case "Track & Field":
      img = "../track_and_field.jpg";
      break;
    case "Starlit Street":
      img = "../starlit_street.jpg";
      break;
  }

  const placeMarker = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setPlayerMarkerStyle({
      top: mouseY,
      left: mouseX,
      visibility: "visible",
    });
    const coords = {
      x: mouseX - bounds.x,
      y: mouseY - bounds.y,
    };

    // Send coords to backend for checking
    // If correct, place the waldo marker onto the pixel position where waldo is
    // Redirect user to end screen page
  };

  return (
    <>
      <ColouredBG />
      <div className={`screenContainer ${GameClasses.container}`}>
        <div className={GameClasses.uiContainer}>
          <div className={GameClasses.uiInnerContainer}>
            <img
              className={GameClasses.waldo}
              src="../timerWaldo.png"
              alt="WaldoTimer"
            />
            <div className={GameClasses.timerContainer}>
              <span className={GameClasses.numComponent}>{minutes}</span>
              <span>:</span>
              <span>{seconds}</span>
              <span>:</span>
              <span>{miliseconds}</span>
            </div>
            <Back style={GameClasses.backBtn} previousPage={"/LevelSelect"} />
          </div>
        </div>
        <img
          className={GameClasses.gameImage}
          src={img}
          alt="gameImage"
          onClick={placeMarker}
        />
        <div
          style={playerMarkerStyle}
          className={GameClasses.playerChoiceMarker}
        >
          <div className={GameClasses.redDot}></div>
        </div>
        <div style={answerMarkerStyle} className={GameClasses.answerMarker}>
          <div className={GameClasses.innerAnswerMarker}>
            <img src="../waldo_head_square.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
