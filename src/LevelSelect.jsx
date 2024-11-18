import { useNavigate } from "react-router-dom";
import LSClasses from "./stylesheets/levelSelect.module.css";
import ColouredBG from "./ColouredBG";
import Back from "./Back";
import { useEffect, useState } from "react";

function LevelSelect() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      const response = await fetch("http://localhost:3000/levels");
      const json = await response.json();
      setLevels(json);
    };
    fetchLevels();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <ColouredBG />

      <div className={LSClasses.outerContainer}>
        <div className={LSClasses.innerContainer}>
          <h1 className="sectionHeader">
            Level Select
            <Back previousPage={"/Welcome"} style={LSClasses.backBtn} />
          </h1>
          <div className={LSClasses.levelSelectContainer}>
            {levels.map((level) => {
              return (
                <div
                  className={LSClasses.card}
                  key={level.name}
                  data-testid="level"
                  onClick={() => {
                    navigate("/Game/" + level.name);
                  }}
                >
                  <img
                    className={LSClasses.cardBG}
                    src={level.img}
                    alt="cardBG"
                  />
                  <div className={LSClasses.contentContainer}>
                    <img
                      className={LSClasses.waldoHead}
                      src="./cropped_waldo_head.png"
                      alt="waldoHead"
                    />
                    <div className={LSClasses.textContainer}>
                      <div className={LSClasses.textBorder}>
                        <div className={LSClasses.gameNameContainer}>
                          <span className={LSClasses.blueHeader}>Where's</span>
                          <span className={LSClasses.redHeader}>Waldo?</span>
                        </div>
                        <span
                          className={LSClasses.levelName}
                          data-testid={level.name}
                        >
                          {level.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default LevelSelect;
