import { useEffect } from "react";
import LevelSelect from "./LevelSelect";
import Welcome from "./Welcome";
import ColouredBG from "./ColouredBG";

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      console.log("ScrollY: " + window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ColouredBG />
      <Welcome />
      <LevelSelect />
    </>
  );
}

export default Home;
