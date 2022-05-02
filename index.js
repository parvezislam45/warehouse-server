const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 7000;



// --------MiddleWire------------
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0oet1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{

        // -----------Get Product---------------
        await client.connect();
        const productCollection = client.db('davidBikeMania').collection('products')
        app.get('/product',async (req,res)=>{
            const query = {}
            const cursor = productCollection.find(query)
            const newProduct =await cursor.toArray()
            res.send(newProduct);
        })
        app.get('/product/:id',async (req,res) =>{
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const product = await productCollection.findOne(query)
            res.send(product)
        })

    //    ------------ Post Data------------
    app.post('/product',async (req,res) =>{
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
    })

    // ---------- Delate Data----------------
     app.delete('/product/:id',async (req,res)=>{
         const id = req.params.id;
         const query = {_id: ObjectId(id)};
         const result = await productCollection.deleteOne(query);
         res.send(result);
     })
    }
    finally{

    }
}

run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('Alhamdulliah Your server is Running')
})

app.listen(port,()=>{
    console.log('Alhamdullilah Your server is Start')
})