import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Back({ previousPage, style = "" }) {
  const navigate = useNavigate();
  const mainIconRef = useRef();
  const iconShadowRef = useRef();

  const goBack = () => {
    navigate(previousPage);
  };

  const rotate = () => {
    mainIconRef.current.classList.add("rotate");
    iconShadowRef.current.classList.add("rotateSpecial");
  };

  const rotateBack = () => {
    mainIconRef.current.classList.remove("rotate");
    iconShadowRef.current.classList.remove("rotateSpecial");
  };

  return (
    <button
      onMouseEnter={rotate}
      onMouseLeave={rotateBack}
      onClick={goBack}
      className={`backBtn ${style}`}
    >
      <div className="backBtnIconContainer">
        <i className="fa-solid fa-rotate-left mainIcon" ref={mainIconRef}></i>
        <i
          className="fa-solid fa-rotate-left iconShadow"
          ref={iconShadowRef}
        ></i>
      </div>
    </button>
  );
}

export default Back;
