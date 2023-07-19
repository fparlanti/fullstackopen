const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackdb:${password}@cluster0.eqxasq1.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then(result => {
    result.forEach(item => {
      console.log(item.name, item.number)
    });
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const num = process.argv[4]

  const person = new Person({
    name: name,
    number: num
  })

  person.save().then(result=>{
    console.log(`added ${name} number ${num} to phonebook`)
    mongoose.connection.close()
  })
}