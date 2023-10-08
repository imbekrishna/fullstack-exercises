import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ stats }) => {
  const { good, bad, neutral, all } = stats;

  const getAverage = () => {
    const sum = good * 1 + neutral * 0 + bad * -1;
    return sum / all;
  };

  const getPositivePer = () => {
    return (good / all) * 100;
  };

  if (all > 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={getAverage()} />
            <StatisticLine text="positive" value={`${getPositivePer()} %`} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

function App() {
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
  });

  const handleGood = () => {
    setStats({
      ...stats,
      good: stats.good + 1,
      all: stats.all + 1,
    });
  };
  const handleBad = () => {
    setStats({
      ...stats,
      bad: stats.bad + 1,
      all: stats.all + 1,
    });
  };
  const handleNeutral = () => {
    setStats({
      ...stats,
      neutral: stats.neutral + 1,
      all: stats.all + 1,
    });
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button text={"good"} handleClick={handleGood} />
      <Button text={"neutral"} handleClick={handleNeutral} />
      <Button text={"bad"} handleClick={handleBad} />
      <h1>statistics</h1>
      <Statistics stats={stats} />
    </>
  );
}

export default App;
