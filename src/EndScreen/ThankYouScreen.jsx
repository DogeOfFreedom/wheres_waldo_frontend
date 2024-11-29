import { useNavigate } from "react-router-dom";
import TYSClasses from "../stylesheets/thankYouScreen.module.css";

function ThankYouScreen() {
  const navigate = useNavigate();

  return (
    <div className={`screenContainer ${TYSClasses.container}`}>
      <div className={TYSClasses.titleContainer}>
        <p>Thanks for</p>
        <p>playing</p>
        <button
          onClick={() => navigate("/LevelSelect")}
          className={`actionBtn ${TYSClasses.playAgainBtn}`}
        >
          Play Again?
        </button>
        <button
          onClick={() => navigate("/Welcome")}
          className={`actionBtn ${TYSClasses.homeBtn}`}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default ThankYouScreen;
