import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ handler, search }) => {
  return (
    <div>
      filter shown with: <input onChange={handler} value={search} />
    </div>
  )
}

const PersonForm = ({ persons, setPersons, setMessageText, setMessageType }) => {
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
            setMessageType(1)
            setMessageText(`Number of ${changedPerson.name} modified`)
            setTimeout(() => { setMessageText(null) }, 5000)
            setPersons(persons.map(person => person.id !== id ? person : changedPerson))
          })
          .catch(error => {
            setMessageType(0)
            setMessageText(`Error updating the phone number of ${changedPerson.name} `)
            setTimeout(() => { setMessageText(null) }, 5000)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedNotes => {
          setMessageType(1)
          setMessageText(`Added ${newPerson.name}`)
          setTimeout(() => { setMessageText(null) }, 5000)
          setPersons(returnedNotes)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessageType(0)
          setMessageText(`Error adding new phone entry from server`)
          setTimeout(() => { setMessageText(null) }, 5000)
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

const Notification = ({ message, type }) => {
  let messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  if (type === 0) {
    messageStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
  }
  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [messageText, setMessageText] = useState(null)
  const [messageType, setMessageType] = useState(0)   //0=error, 1=successfull

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handlerDeletePerson = (event) => {
    const id = Number(event.target.id)
    if (window.confirm(`Delete  ${event.target.name} ?`)) {
      personService
        .remove(event.target.id)
        .then(response => {
          setMessageType(1)
          setMessageText(`${event.target.name} was successufully deleted from server`)
          setTimeout(() => { setMessageText(null) }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessageType(0)
          setMessageText(`Error deleting ${event.target.name} from server`)
          setTimeout(() => { setMessageText(null) }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={messageText} type={messageType} />

      <Filter handler={event => setNewSearch(event.target.value)} search={newSearch} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessageText={setMessageText} setMessageType={setMessageType} />

      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} search={newSearch} handlerDelete={handlerDeletePerson} />
    </div>
  )
}

export default App;
