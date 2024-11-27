import { useEffect, useState } from "react";
import LBClasses from "../stylesheets/leaderboard.module.css";
import { useParams } from "react-router-dom";

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const { levelName } = useParams();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch("http://localhost:3000/players/" + levelName);
      const json = await res.json();
      setPlayers(json);
    };
    fetchLeaderboard();
  }, []);

  return (
    <>
      <div className={`${LBClasses.container} screenContainer`}>
        <h1 className="sectionHeader">Leaderboard</h1>
        <table className={LBClasses.leaderboardTable}>
          <thead>
            <tr className={LBClasses.headerRow}>
              <th>Rank</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const { time } = player;
              const min = time.minutes.toString().padStart(2, 0);
              const sec = time.seconds.toString().padStart(2, 0);
              const ms = time.miliseconds.toString().padStart(2, 0);
              const name = player.anon ? "anon" : player.name;
              return (
                <tr key={player.rank}>
                  <td className={LBClasses.rank}>{player.rank}</td>
                  <td>{name}</td>
                  <td>{`${min}:${sec}:${ms}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Leaderboard;
