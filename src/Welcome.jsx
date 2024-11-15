import welcomeClasses from "./stylesheets/welcome.module.css";
import ColouredBG from "./ColouredBG";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      <ColouredBG />
      <div className={welcomeClasses.container}>
        <div className={welcomeClasses.titleContainer}>
          <div className={welcomeClasses.imgSpanContainer}>
            <span className={welcomeClasses.titleText}>WHERE'S</span>
            <img
              className={welcomeClasses.walkingWaldo}
              src="./pngegg.png"
              alt="walkingWaldo"
            />
          </div>
          <span
            className={`${welcomeClasses.secondRowTitle} ${welcomeClasses.titleText}`}
          >
            WALDO?
          </span>
          <div className={welcomeClasses.subTextContainer}>
            <span className={welcomeClasses.creatorName}>(Kabocci)</span>
            <div className={welcomeClasses.innerSubTextContainer}>
              <span className={welcomeClasses.subText}>
                Can someone please find him?
              </span>
              <span className={welcomeClasses.subText}>
                I've been looking for days...
              </span>
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
      </div>
    </>
  );
}

export default Welcome;
