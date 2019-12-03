const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

require("./Book")

const Book = mongoose.model("Book")

mongoose.connect("mongodb+srv://refan_services:12345678abc@cluster0-xuqzd.mongodb.net/bookservices?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database is connected!')
})


app.get('/', (req, res) => {
    res.send("This is our main endpoint books!")
})

// create func
app.post("/book", (req, res) => {
    let newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }

    let book = new Book(newBook)
    book.save().then(() => {
        console.log("new book created!")
        res.send('Book created')
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.get("/books", (req, res) => {
    Book.find().then((books) => {
        res.json(books)
    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book)
        } else {
            res.sendStatus(404)
        }

    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

app.delete("/book/:id", (req, res) => {
    Book.findByIdAndRemove(req.params.id).then(() => {
        res.send("Book removed with success!")
    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

app.listen(4545, () => {
    console.log('Up and running port 4545! This is out Books services ')
})