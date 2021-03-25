const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;

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

    // send data to database
    app.post("/addProduct", (req, res) => {
        const product = req.body;
        // console.log(product);
        productCollection.insertOne(product)
            .then(result => {
                console.log('data added successfully');
                res.send('product added successfully!')
            })
    })
});

app.listen(3000);