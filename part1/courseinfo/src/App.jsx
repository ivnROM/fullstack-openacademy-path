const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.number}
      </p>
    </>
  );
};

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part name={props.title1} number={props.exercises1} />
      <Part name={props.title2} number={props.exercises2} />
      <Part name={props.title3} number={props.exercises3} />
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total_exercises}</p>
    </>
  );
};
const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        title1={part1}
        title2={part2}
        title3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total total_exercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
