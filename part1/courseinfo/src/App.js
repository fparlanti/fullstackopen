const Header = (param) => {
  return (
    <h1>{param.course}</h1>
  )
}

const Part = (param) => {
  return (
    <p>
      {param.part} {param.exercises}
    </p>
  )
}

const Content = (param) => {
  const param1 = param.content[0]
  const param2 = param.content[1]
  const param3 = param.content[2]
  return (
    <div>
      <Part part={param1.part} exercises={param1.exercises} />
      <Part part={param2.part} exercises={param2.exercises} />
      <Part part={param3.part} exercises={param3.exercises} />
    </div>
  )
}

const Total = (param) => {
  return (
    <p>Number of exercises {param.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const content = [{ part: 'Fundamentals of React', exercises: 10 }, { part: 'Using props to pass data', exercises: 7 }, { part: 'State of a component', exercises: 14 }]
  let total = 0;
  content.map(item => (
    total += item.exercises
  ))

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  )
}

export default App;
