import { useNavigate } from "react-router-dom";
import TYSClasses from "../stylesheets/thankYouScreen.module.css";

function ThankYouScreen() {
  const navigate = useNavigate();

  return (
    <div className={`screenContainer ${TYSClasses.container}`}>
      <span>Thanks for playing</span>
      <button onClick={() => navigate("/LevelSelect")} className="actionBtn">
        Play Again?
      </button>
      <button onClick={() => navigate("/Welcome")} className="actionBtn">
        Home
      </button>
    </div>
  );
}

export default ThankYouScreen;
