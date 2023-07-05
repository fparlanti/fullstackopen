const Part = (props) => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} content={part} />
      )}
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}

const Sum = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum += part.exercises, 0)
  return (
    <div>
      <b>
        total of {total} exercises
      </b>
    </div>
  )
}


const Course = (props) => {
  const course = props.course
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </div>
  )
}

export default Course