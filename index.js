const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rlxfp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(cors());
app.use(express.json());

async function run() {
    try {
        await client.connect();
        const taskCollection = client.db('dailyTask').collection('tasks');
        const completedCollection = client.db('dailyTask').collection('completed');


        app.post('/addTask', async (req, res) => {
            const addTask = req.body;
            console.log(addTask);
            const result = await taskCollection.insertOne(addTask);
            res.send(result);
        })

        app.get('/addTask', async (req, res) => {            
            const result = await taskCollection.find({}).toArray();
            res.send(result)
        })

        app.post('/complete', async (req, res) => {;
            const task = req.body;
            const result = await completedCollection.insertOne(task);
            res.send(result)

        });

         app.delete('/addTask/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = {_id: ObjectId(id)};
            const result = await taskCollection.deleteOne(query);
            res.send(result)

        });

        app.get('/completedTask', async (req, res)=>{
            const result = await completedCollection.find({}).toArray();
            res.send(result)
        })

    }

    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running port')
});

app.listen(port, () => {
    console.log('listening to port', port)
});