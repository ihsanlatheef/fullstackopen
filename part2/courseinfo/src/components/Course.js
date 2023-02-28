const Course = (props) => {
  return (
    <div>
      {props.courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <table>
            <tbody>
              {course.parts.map((parts) => (
                <tr key={parts.id}>
                  <td>{parts.name}</td>
                  <td>{parts.exercises}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total of {course.parts.reduce((total, part) => part.exercises + total, 0)} exercises</h3>
        </div>
      ))}
    </div>
  );
};

export default Course;
