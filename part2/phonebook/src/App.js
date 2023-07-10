import { useState, useEffect } from 'react'
import personService from './services/persons'

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
    const oldPersonExist = persons.find(item => item.name === newName)

    if (oldPersonExist) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const id = oldPersonExist.id
        const changedPerson = { ...oldPersonExist, number: newNumber }
        personService
          .update(id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id != id ? person : changedPerson))
          })
          .catch(error => {
            alert('Error updating  phonebook entry')
          })
      }
    } else {
      const id = persons.length + 1;
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedNotes => {
          setPersons(persons.concat(returnedNotes))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert('Error adding new phonebook entry')
        })

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

const Person = ({ id, name, number, handlerDelete }) => {

  return (
    <div>
      <p>{name} {number} <button onClick={handlerDelete} id={id} name={name}>delete</button>
      </p>
    </div>
  )
}

const Persons = (props) => {
  const { persons, search, handlerDelete } = props
  return (
    persons.map(function (person) {
      if (search.length === 0 || (search.length > 0 && person.name.includes(search))) {
        return (
          <Person key={person.id} id={person.id} name={person.name} number={person.number} handlerDelete={handlerDelete} />
        )
      }
    })
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handlerDeletePerson = (event) => {
    const id = event.target.id
    if (window.confirm(`Delete  ${event.target.name} ?`)) {
      personService
        .remove(event.target.id)
        .then(response => {
          setPersons(persons.filter(person => person.id != id))
        })
        .catch(error => {
          alert('Person already deleted')
          setPersons(persons.filter(person => person.id != id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={event => setNewSearch(event.target.value)} search={newSearch} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} search={newSearch} handlerDelete={handlerDeletePerson} />
    </div>
  )
}

export default App;
