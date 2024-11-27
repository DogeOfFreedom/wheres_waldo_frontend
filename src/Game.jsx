import { useEffect, useRef, useState } from "react";
import ColouredBG from "./ColouredBG";
import GameClasses from "./stylesheets/game.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Back from "./Back";

function Game() {
  const navigate = useNavigate();
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
  const [gameImageStyle, setGameImageStyle] = useState({});
  const { levelName } = useParams(null);
  const [level, setLevel] = useState({});
  const [name, setName] = useState("");
  const [anon, setAnon] = useState(false);

  useEffect(() => {
    const fetchLevel = async () => {
      const response = await fetch("http://localhost:3000/levels/" + levelName);
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
      time: {
        minutes,
        seconds,
        miliseconds,
      },
      levelId: level.id,
    };
    try {
      const response = await fetch("http://localhost:3000/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.validName) {
        navigate("/End/" + levelName);
      } else {
        setErrorMsg(data.errors[0].msg);
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
      name: levelName,
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
      // const { inside, answer } = await res.json();
      const json = await res.json();

      // Player found target
      if (json.inside) {
        setRunning(false); // Stop timer
        modalRef.current.showModal(); // Show modal for user to input their name
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

      setPlayerMarkerStyle({
        visibility: "hidden",
      });

      const bounds = e.currentTarget.getBoundingClientRect();
      const minX = 0;
      const minY = 0;
      const maxX = Math.abs(dimensions.w - bounds.width);
      const maxY = Math.abs(dimensions.h - bounds.height);

      const { xDiff, yDiff } = calcDifference(
        oldClientLocation.current,
        client
      );
      if (xDiff != 0 || yDiff != 0) {
        moved.current = true;
      }
      oldClientLocation.current = getRelativeCoords(e);

      imgLocation.current = {
        x: Math.min(maxX, Math.max(minX, imgLocation.current.x + xDiff)),
        y: Math.min(maxY, Math.max(minY, imgLocation.current.y + yDiff)),
      };

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
      placeMarker(e);
    }
  };

  const handleMouseExit = () => {
    dragging.current = false;
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
            <p>Click and drag to navigate around the image</p>
            <p>Click to make your choice</p>
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
