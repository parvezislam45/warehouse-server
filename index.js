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
        const orderCollection = client.db('davidBikeMania').collection('orders')

        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // --------load user order---------

        app.get('/order', async (req, res) => {
            const query = {};
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        });

        
        app.get('/product/:id',async (req,res) =>{
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const product = await productCollection.findOne(query)
            res.send(product)
        })

        app.get('/productCount', async (req,res)=>{
            const query = {}
            const cursor = productCollection.find(query)
            const count =await cursor.count()
            res.send({count})
        })
    //    ------------ Post Data------------
    
    app.post('/product',async (req,res) =>{
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
    })

    // -------------Order Data -----------------
    
    app.post('/order',async (req,res) =>{
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.send(result);
    })

    // ---------- Delate Data----------------
     app.delete('/product/:id',async (req,res)=>{
         const id = req.params.id;
         const query = {_id: ObjectId(id)};
         const result = await productCollection.deleteOne(query);
         res.send(result);
     })
    // //  ---------------Update Data-------------
    app.put('/user/:id',async(req,res)=>{
        const id = req.params.id;
        const updateQuantity = req.body;
        const filter = {_id: ObjectId(id)};
        const options ={upsert: true}
        const updatedDoc = {
            $set: {
                quantity: updateQuantity.newQuantity
            }
        };
        const result = await productCollection.updateOne(filter,updatedDoc,options);
        res.send(result)
    })
    
    app.put('/delivery/:id',async(req,res)=>{
        const id = req.params.id;
        const updateQuantity = req.body
        const delevary = updateQuantity.quantity -1
        const filter = {_id: ObjectId(id)};
        const options ={upsert: true}
        const updatedDoc = {
            $set: {
                quantity: delevary
            }
        };
        const result = await productCollection.updateOne(filter,updatedDoc,options);
        res.send(result)
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