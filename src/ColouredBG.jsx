import bgClasses from "./stylesheets/bg.module.css";

function ColouredBG() {
  return (
    <div className={bgClasses.colouredBG}>
      <div className={bgClasses.blueBG}></div>
      <div className={bgClasses.redBG}></div>
    </div>
  );
}

export default ColouredBG;
