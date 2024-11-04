import ColouredBG from "./ColouredBG";
import welcomeClasses from "./stylesheets/welcome.module.css";

function Welcome() {
  return (
    <>
      <div className="overflowContainer">
        <ColouredBG />
        <div className={welcomeClasses.container}>
          <div className={welcomeClasses.imgSpanContainer}>
            <span>WHERE'S</span>
            <img
              className={welcomeClasses.walkingWaldo}
              src="./pngegg.png"
              alt=""
            />
            <div className={welcomeClasses.subTextContainer}>
              <span className={welcomeClasses.creatorName}>(Jiachen Si)</span>
              <div>
                <span>Can someone please find him?</span>
                <span>I've been looking for days...</span>
              </div>
            </div>
          </div>
          <span className={welcomeClasses.secondRowTitle}>WALDO?</span>
          <div className={welcomeClasses.innerContainer}>
            <img
              className={welcomeClasses.waldoHead}
              src="./public/pngkey.com-wheres-waldo-png-9298678.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
