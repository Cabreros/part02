const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
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

const Content = ({ content }) => {
  return (
    <div>
      {content.map((element) => (
        <Part key={element.id} part={element} />
      ))}
    </div>
  );
};

const Total = ({ content }) => {
  const total = content.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  );
};

export default Course;
