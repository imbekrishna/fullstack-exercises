const Header = ({ course }) => {
  return (
    <>
      <h2>{course}</h2>
    </>
  );
};

const Part = ({ info }) => {
  return (
    <p>
      {info.name} {info.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((val) => (
        <Part key={val.exercises} info={val} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const sum = parts.reduce((a, { exercises }) => a + exercises, 0);

  return (
    <>
      <p>
        <strong>Number of exercises {sum}</strong>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
