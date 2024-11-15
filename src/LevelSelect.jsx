import { useNavigate } from "react-router-dom";
import LSClasses from "./stylesheets/levelSelect.module.css";
import ColouredBG from "./ColouredBG";
import Back from "./Back";

function LevelSelect() {
  const levels = [
    {
      name: "Starlit Street",
      img: "./starlit_street.jpg",
    },
    {
      name: "Track & Field",
      img: "track_and_field.jpg",
    },
    { name: "Snow Day", img: "snow_day.jpg" },
  ];
  const navigate = useNavigate();

  return (
    <>
      <ColouredBG />

      <div className={LSClasses.outerContainer}>
        <div className={LSClasses.innerContainer}>
          <Back previousPage={"/Welcome"} style={LSClasses.backBtn} />
          <h1 className="sectionHeader">Level Select</h1>
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
                        <span className={LSClasses.blueHeader}>Where's</span>
                        <span className={LSClasses.redHeader}>Waldo?</span>
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
