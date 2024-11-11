import welcomeClasses from "./stylesheets/welcome.module.css";
import ColouredBG from "./ColouredBG";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      <ColouredBG />
      <div className="overflowContainer">
        <div className={welcomeClasses.container}>
          <div className={welcomeClasses.titleContainer}>
            <div className={welcomeClasses.imgSpanContainer}>
              <span>WHERE'S</span>
              <img
                className={welcomeClasses.walkingWaldo}
                src="./pngegg.png"
                alt="walkingWaldo"
              />
            </div>
            <span className={welcomeClasses.secondRowTitle}>WALDO?</span>
            <div className={welcomeClasses.subTextContainer}>
              <span className={welcomeClasses.creatorName}>(Jiachen Si)</span>
              <div>
                <span>Can someone please find him?</span>
                <span>I've been looking for days...</span>
              </div>
            </div>
          </div>
          <button
            className={`${welcomeClasses.actionBtn} actionBtn`}
            onClick={() => navigate("/LevelSelect")}
          >
            Play
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Welcome;
