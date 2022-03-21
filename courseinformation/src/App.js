const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
      <Part part={parts[3]} />
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
      {
        name: "Redux",
        exercises: 11,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
