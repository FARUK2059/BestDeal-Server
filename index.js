
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const port = process.env.PORT || 5000;


// middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://bestdeal-5e08b.web.app',
        'https://bestdeal-5e08b.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());


// MongoDB Conection
const uri = `mongodb+srv://${process.env.ENV_USE}:${process.env.ENV_PASS}@cluster0.6e55rfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // Database Conection
        const productCollections = client.db("BestDeal").collection("product");


        // get All Products functionality
        app.get('/products', async (req, res) => {
            const result = await productCollections.find().toArray();
            res.send(result);
        });

        // Kuno Database a koto gula Data ase seta Calculet korar function
        app.get('/productsCount', async (req, res) => {
            const count = await productCollections.estimatedDocumentCount();
            res.send({ count })
        })

        // pagination client side data patanur function
        app.get('/product', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);

            console.log('pagination query', page, size);
            const result = await productCollections.find()
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('BestDeal is running')
})

app.listen(port, () => {
    console.log(`BestDeal is sitting on port ${port}`);
})





