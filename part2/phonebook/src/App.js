import { useState } from 'react'

const Filter = ({ handler, search }) => {
  return (
    <div>
      filter shown with: <input onChange={handler} value={search} />
    </div>
  )
}

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handlerAdd = (event) => {
    event.preventDefault();
    const id = persons.length + 1;
    const newPerson = { name: newName, number: newNumber, id: id }
    if (persons.find(item => item.name === newPerson.name)) {
      alert(` ${newPerson.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <form onSubmit={handlerAdd}>
      <div>
        name: <input onChange={event => setNewName(event.target.value)} value={newName} required />
      </div>
      <div>
        number: <input onChange={event => setNewNumber(event.target.value)} value={newNumber} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

const Persons = (props) => {
  const { persons, search } = props
  return (
    persons.map(function (person) {
      if (search.length > 0 && person.name.includes(search)) {
        return (
          <Person key={person.id} name={person.name} number={person.number} />
        )
      }
    })
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }])
  const [newSearch, setNewSearch] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={event => setNewSearch(event.target.value)} search={newSearch} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} search={newSearch} />
    </div>
  )
}

export default App;
