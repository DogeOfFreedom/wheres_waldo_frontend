import LBClasses from "./stylesheets/leaderboard.module.css";

function Leaderboard() {
  const data = [
    {
      rank: 1,
      name: "Runner A",
      time: "00:15:02",
    },
    {
      rank: 2,
      name: "Runner B",
      time: "00:15:25",
    },
    {
      rank: 3,
      name: "Runner C",
      time: "00:15:47",
    },
    {
      rank: 4,
      name: "Runner D",
      time: "00:16:03",
    },
    {
      rank: 5,
      name: "Runner E",
      time: "00:16:20",
    },
    {
      rank: 6,
      name: "Runner F",
      time: "00:16:38",
    },
    {
      rank: 7,
      name: "Runner G",
      time: "00:16:56",
    },
    {
      rank: 8,
      name: "Runner H",
      time: "00:17:12",
    },
    {
      rank: 9,
      name: "Runner I",
      time: "00:17:27",
    },
    {
      rank: 10,
      name: "Runner J",
      time: "00:17:45",
    },
    {
      rank: 11,
      name: "Runner K",
      time: "00:18:01",
    },
    {
      rank: 12,
      name: "Runner L",
      time: "00:18:19",
    },
    {
      rank: 13,
      name: "Runner M",
      time: "00:18:34",
    },
    {
      rank: 14,
      name: "Runner N",
      time: "00:18:50",
    },
    {
      rank: 15,
      name: "Runner O",
      time: "00:19:05",
    },
    {
      rank: 16,
      name: "Runner P",
      time: "00:19:22",
    },
    {
      rank: 17,
      name: "Runner Q",
      time: "00:19:38",
    },
    {
      rank: 18,
      name: "Runner R",
      time: "00:19:54",
    },
    {
      rank: 19,
      name: "Runner S",
      time: "00:20:10",
    },
    {
      rank: 20,
      name: "Runner T",
      time: "00:20:25",
    },
    {
      rank: 21,
      name: "Runner U",
      time: "00:20:42",
    },
    {
      rank: 22,
      name: "Runner V",
      time: "00:20:57",
    },
    {
      rank: 23,
      name: "Runner W",
      time: "00:21:13",
    },
    {
      rank: 24,
      name: "Runner X",
      time: "00:21:30",
    },
    {
      rank: 25,
      name: "Runner Y",
      time: "00:21:46",
    },
    {
      rank: 26,
      name: "Runner Z",
      time: "00:22:02",
    },
    {
      rank: 27,
      name: "Runner AA",
      time: "00:22:18",
    },
    {
      rank: 28,
      name: "Runner AB",
      time: "00:22:35",
    },
    {
      rank: 29,
      name: "Runner AC",
      time: "00:22:51",
    },
    {
      rank: 30,
      name: "Runner AD",
      time: "00:23:08",
    },
  ];

  return (
    <>
      <div className={`${LBClasses.container} screenContainer`}>
        <h1 className="sectionHeader">Leaderboard</h1>
        <table className={LBClasses.leaderboardTable}>
          <tr className={LBClasses.headerRow}>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
          {data.map((tr) => {
            return (
              <tr key={tr.rank}>
                <td className={LBClasses.rank}>{tr.rank}</td>
                <td>{tr.name}</td>
                <td>{tr.time}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default Leaderboard;
