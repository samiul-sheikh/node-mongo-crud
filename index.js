const express = require('express');

const app = express();

const password = '';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicAdmin:#@cluster0.2uohe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('hello, I am working');
})


client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.listen(3000);