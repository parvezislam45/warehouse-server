const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 7000;



// --------MiddleWire------------
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0oet1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('Alhamdullilh')
  // perform actions on the collection object
  client.close();
});


app.get('/',(req,res)=>{
    res.send('Alhamdulliah Your server is Running')
})

app.listen(port,()=>{
    console.log('Alhamdullilah Your server is Start')
})