const express = require('express');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const password = 'test1234';

const uri = "mongodb+srv://organicAdmin:test1234@cluster0.2uohe.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// send file to UI
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
    const collection = client.db("organicdb").collection("products");
    // send data to database
    const product = { name: "honey", price: 50, quantity: 10 };
    collection.insertOne(product)
        .then(result => {
            console.log('one product inserted successfully');
        })
    console.log('database connected');
    // client.close();
});

app.listen(3000);