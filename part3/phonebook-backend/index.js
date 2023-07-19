require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()

/*  whenever express gets an HTTP GET request it will first check if 
the build directory contains a file corresponding to the request's 
address. If a correct file is found, express will return it.*/
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
morgan.token('data', (request, response) => {
  return JSON.stringify(request.body)
})

/*let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]*/

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request, response) => {

  Person.findById(request.params.id).then(query => {
    if (query) {
      response.json(query)
    } else {
      response.status(404).end()
    }
  })
})

app.get("/info", (request, response) => {
  const date = new Date()

  Person.find({}).then(persons => {
    const num = persons.length
    const text = "<p>Phonebook has info for " + num + " people</p><p>" + date[Symbol.toPrimitive]('string') + "</p>"
    response.send(text) 
  })

})

app.delete("/api/persons/:id", (request, response) => {
  // TODO UPDATE THIS FUNCTION
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

/*const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}*/

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })

  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      return response.status(400).json({
        error: 'name must be unique'
      })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
