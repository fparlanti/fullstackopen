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
  const param1 = param.parts[0]
  const param2 = param.parts[1]
  const param3 = param.parts[2]
  return (
    <div>
      <Part part={param1.name} exercises={param1.exercises} />
      <Part part={param2.name} exercises={param2.exercises} />
      <Part part={param3.name} exercises={param3.exercises} />
    </div>
  )
}

const Total = (param) => {
  let sum = 0
  param.parts.forEach(p => {
    sum += p.exercises
  })

  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
