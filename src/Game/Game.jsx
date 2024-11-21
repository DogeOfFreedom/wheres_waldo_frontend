import { useEffect, useRef, useState } from "react";
import ColouredBG from "../ColouredBG";
import GameClasses from "../stylesheets/game.module.css";
import { Navigate, useParams } from "react-router-dom";
import Back from "../Back";

function Game() {
  const modalRef = useRef(null);
  const nameFieldRef = useRef(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const oldClientLocation = useRef(null);
  const imgLocation = useRef({
    x: 0,
    y: 0,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const [playerMarkerStyle, setPlayerMarkerStyle] = useState({
    top: "0px",
    left: "0px",
  });
  const [answerMarkerStyle, setAnswerMarkerStyle] = useState({
    top: "100px",
    left: "100px",
    display: "none",
  });
  const [gameImageStyle, setGameImageStyle] = useState({});
  const { levelname } = useParams(null);
  const [level, setLevel] = useState({});
  const [name, setName] = useState("");
  const [anon, setAnon] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  useEffect(() => {
    const fetchLevel = async () => {
      const response = await fetch("http://localhost:3000/levels/" + levelname);
      const json = await response.json();
      setLevel(json);
    };
    fetchLevel();
  }, []);

  // Start Timer
  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => setTime((time) => time + 1), 10);
    }

    return () => clearInterval(intervalId);
  }, [running]);

  const handleCheck = (e) => {
    const { checked } = e.target;
    if (checked) {
      nameFieldRef.current.disabled = true;
      return setAnon(true);
    }
    nameFieldRef.current.disabled = false;
    return setAnon(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      anon,
    };
    try {
      const response = await fetch("http://localhost:3000/players", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.validName) {
        Navigate("/end");
      } else {
        setErrorMsg(data.error);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const placeMarker = async (e) => {
    const bounds = e.target.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setPlayerMarkerStyle({
      top: mouseY,
      left: mouseX,
      visibility: "visible",
    });
    const body = {
      name: levelname,
      x: mouseX - bounds.x,
      y: mouseY - bounds.y,
    };

    try {
      const res = await fetch("http://localhost:3000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const { inside } = await res.json();

      // Player found target
      if (inside) {
        setRunning(false); // Stop timer
        modalRef.current.showModal(); // Show modal for user to input their name
        const style = {
          top: mouseY,
          left: mouseX,
          display: "block",
        };
        setAnswerMarkerStyle(style);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const getRelativeCoords = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    return {
      x: Math.ceil(e.clientX - bounds.x),
      y: Math.ceil(e.clientY - bounds.y),
    };
  };

  // Calculates how much an object on coord1 would have to move along each
  // axis to get to coord2
  const calcDifference = (coord1, coord2) => {
    return {
      xDiff: Math.ceil(coord1.x - coord2.x),
      yDiff: Math.ceil(coord1.y - coord2.y),
    };
  };

  const handleMouseDown = (e) => {
    dragging.current = true;
    moved.current = false;
    oldClientLocation.current = getRelativeCoords(e);
  };

  const handleMouseMove = (e) => {
    if (dragging.current) {
      const client = getRelativeCoords(e);
      const { dimensions } = level;

      const bounds = e.currentTarget.getBoundingClientRect();
      const minX = 0;
      const minY = 0;
      const maxX = Math.abs(dimensions.w - bounds.width);
      const maxY = Math.abs(dimensions.h - bounds.height);

      const { xDiff, yDiff } = calcDifference(
        oldClientLocation.current,
        client
      );
      oldClientLocation.current = getRelativeCoords(e);

      // console.log(
      //   `${oldClientLocation.current.x} ${oldClientLocation.current.y} --- ${client.x} ${client.y}`
      // );

      console.log(`${xDiff} ${yDiff}`);

      // if (xDiff > 100 || yDiff > 100) {
      //   let i = 0;
      // }

      imgLocation.current = {
        x: Math.min(maxX, Math.max(minX, imgLocation.current.x + xDiff)),
        y: Math.min(maxY, Math.max(minY, imgLocation.current.y + yDiff)),
      };
      // oldClientLocation.current = getRelativeCoords(e);

      if (xDiff > 15 || yDiff > 15) {
        let i = 0;
      }

      setGameImageStyle({
        transform: `translate(${String(-imgLocation.current.x)}px, ${String(
          -imgLocation.current.y
        )}px)`,
      });
    }
  };

  const handleMouseUp = (e) => {
    dragging.current = false;
    // Client clicked
    if (!moved.current) {
      // placeMarker(e);
    }
  };

  const handleMouseExit = () => {
    dragging.current = false;
  };

  const getCoord = (e) => {
    const rect = e.target.getBoundingClientRect();
    console.log(rect);
    setX(Math.max(Math.floor(e.clientX - rect.x), 0));
    setY(Math.max(Math.floor(e.clientY - rect.y), 0));
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
            {/* <button onClick={() => modalRef.current.showModal()}>
              Show modal
            </button> */}
            <div className={GameClasses.test}>
              <span>{x}</span>
              <span> : </span>
              <span>{y}</span>
            </div>
          </div>
        </div>
        <div
          className={GameClasses.imageContainer}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseExit}
        >
          <img
            className={GameClasses.gameImage}
            src={level.img}
            alt="gameImage"
            style={gameImageStyle}
            draggable={false}
          />
        </div>

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

        <dialog ref={modalRef}>
          <form onSubmit={handleSubmit}>
            <h3>You found Waldo, Nice Job!!!</h3>
            <input
              id="name"
              type="text"
              maxLength={15}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={nameFieldRef}
            />
            {errorMsg ? <p className={GameClasses.errorMsg}>{errorMsg}</p> : ""}
            <div>
              Anonymous
              <input type="checkbox" id="anonymous" onChange={handleCheck} />
            </div>
            <button className={GameClasses.submitFormBtn}>Submit</button>
          </form>
        </dialog>
      </div>
    </>
  );
}

export default Game;
