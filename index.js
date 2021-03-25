const express = require('express');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const password = 'test';

const uri = "mongodb+srv://organicAdmin:test@cluster0.2uohe.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('hello, I am working');
})


client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  console.log('database connected');
  client.close();
});

app.listen(3000);