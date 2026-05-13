import { useState } from "react";

const Section = ({ text }) => <h1>{text}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value, isPercentage }) => (
  <>
    <td>{text}</td>
    <td>
      {value} {isPercentage ? "%" : ""}{" "}
    </td>
  </>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} isPercentage={false} />
          </tr>
          <tr>
            <StatisticLine
              text="neutral"
              value={neutral}
              isPercentage={false}
            />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} isPercentage={false} />
          </tr>
          <tr>
            <StatisticLine text="all" value={total} isPercentage={false} />
          </tr>
          <tr>
            <StatisticLine
              text="average"
              value={average}
              isPercentage={false}
            />
          </tr>
          <tr>
            <StatisticLine
              text="positive"
              value={positive * 100}
              isPercentage={true}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  return (
    <div>
      <Section text="give feedback" />
      <Button onClick={incrementGood} text="good" />
      <Button onClick={incrementNeutral} text="neutral" />
      <Button onClick={incrementBad} text="bad" />
      <Section text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
