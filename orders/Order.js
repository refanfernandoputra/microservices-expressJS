const mongoose = require('mongoose')

mongoose.model("Order", {
    CustomerID: {
        type: mongoose.mongo.ObjectId,
        require: true
    },
    BookID: {
        type: mongoose.mongo.ObjectId,
        require: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    }
})