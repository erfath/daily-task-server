const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app= express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function run(){
    try{



    }
    
    finally{

    }
}


app.get('/', (req, res)=>{
    res.send('Running port')
});

app.listen(port, () => {
    console.log('listening to port', port)
});