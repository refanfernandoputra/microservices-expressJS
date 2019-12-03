const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const axios = require('axios')

const app = express()
mongoose.connect("mongodb+srv://refan_services:12345678abc@cluster0-xuqzd.mongodb.net/ordersservices?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database is connected!')
})
app.use(bodyParser.json())
require("./Order")
const Order = mongoose.model("Order")

app.get('/', (req, res) => {
    res.send('This is main endpoint orders!')
})

app.post("/order", (req, res) => {
    let newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }

    let order = new Order(newOrder)
    order.save().then(() => {
        console.log("new order created!")
        res.send('order created')
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.get("/orders", (req, res) => {
    Order.find().then((order) => {
        res.json(order)
    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

app.get("/order/:id", (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if (order) {
            axios.get(`http://localhost:5555/customer/${order.CustomerID}`).then(customer => {
                let orderObject = { customerName: customer.data.name, bookTitle: '' }

                axios.get(`http://localhost:4545/book/${order.BookID}`).then(book => {
                    orderObject.bookTitle = book.data.title
                    res.json(orderObject)
                })
            })
        }
    })
})

app.listen(7777, () => {
    console.log('running on port 7777')
})