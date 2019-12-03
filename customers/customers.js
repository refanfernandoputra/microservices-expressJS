const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

require("./Customer")

const Customer = mongoose.model("Customer")

mongoose.connect("mongodb+srv://refan_services:12345678abc@cluster0-xuqzd.mongodb.net/customersservices?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database is connected!')
})


app.get('/', (req, res) => {
    res.send("This is our main endpoint customers!")
})

// create func
app.post("/customer", (req, res) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    let customer = new Customer(newCustomer)
    customer.save().then(() => {
        console.log("new customer created!")
        res.send('customer created')
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.get("/customers", (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer)
        } else {
            res.sendStatus(404)
        }

    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

app.delete("/customer/:id", (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send("Customer removed with success!")
    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

app.listen(5555, () => {
    console.log('Up and running port 5555! This is out Books services ')
})