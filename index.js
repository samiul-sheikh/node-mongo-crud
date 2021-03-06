const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const password = 'test1234';

const uri = "mongodb+srv://organicAdmin:test1234@cluster0.2uohe.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// send file to UI
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
    const productCollection = client.db("organicdb").collection("products");

    // read data from database
    app.get('/products', (req, res) => {
        productCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    // load single product from database
    app.get('/product/:id', (req, res) => {
        productCollection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    // send data to database
    app.post("/addProduct", (req, res) => {
        const product = req.body;
        // console.log(product);
        productCollection.insertOne(product)
            .then(result => {
                console.log('data added successfully');
                res.redirect('/');
            })
    })

    // Update or modify a single item and save database
    app.patch('/update/:id', (req, res) => {
        // console.log(req.body.price);
        productCollection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: { price: req.body.price, quantity: req.body.quantity }
            }
        )
            .then(result => {
                // console.log(result);
                res.send(result.modifiedCount > 0)
            })
    })

    // delete data from database & UI
    app.delete('/delete/:id', (req, res) => {
        // console.log(req.params.id);
        productCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                // console.log(result);
                res.send(result.deletedCount > 0);
            })
    })

});

app.listen(3000);