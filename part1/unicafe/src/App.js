import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ goodVal, neutralVal, badVal }) => {
  if (goodVal === 0 && neutralVal === 0 && badVal === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={goodVal} />
            <StatisticsLine text="Neutral" value={neutralVal} />
            <StatisticsLine text="Bad" value={badVal} />
            <StatisticsLine text="All" value={goodVal + neutralVal + badVal} />
            <StatisticsLine text="Average" value={(goodVal + badVal + neutralVal) / 3} />
            <StatisticsLine text="Positive" value={(goodVal / (goodVal + badVal + neutralVal)) * 100} />
          </tbody>
        </table>
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countGood = () => setGood(good + 1);
  const countNeutral = () => setNeutral(neutral + 1);
  const countBad = () => setBad(bad + 1);

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={countGood} text="good" />
      <Button onClick={countNeutral} text="neutral" />
      <Button onClick={countBad} text="bad" />
      <Statistics goodVal={good} neutralVal={neutral} badVal={bad} />
    </div>
  );
};

export default App;
