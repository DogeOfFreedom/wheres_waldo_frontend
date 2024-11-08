import TYSClasses from "./stylesheets/thankYouScreen.module.css";

function ThankYouScreen() {
  return (
    <div className={`screenContainer ${TYSClasses.container}`}>
      <span>Thanks for playing</span>
      <button className={TYSClasses.actionBtn}>Play Again?</button>
    </div>
  );
}

export default ThankYouScreen;
