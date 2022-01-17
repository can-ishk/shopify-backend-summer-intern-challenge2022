const express = require('express');

const app = express();
const port = 3030;

app.use(express.json());

//Routes ahead

app.get('/',(req, res)=>{
    try{
        res.send('Welcome');
    }
    catch(err){
        console.log(err.message)
    }
} )





//Server listener ahead

app.listen(port, ()=>{
    console.log('Shop is now active, listening on port '+port)
})