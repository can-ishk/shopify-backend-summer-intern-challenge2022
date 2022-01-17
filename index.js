const express = require('express');
const fs = require('fs')

const port = 3030;

const app = express();

//Routes ahead

app.get('/',(req, res)=>{
    try{
        res.send('Welcome');
    }
    catch(err){
        console.log(err.message)
    }
} )

app.get ('/shop', (req,res)=>{
    try{
        fs.readFile(__dirname + '/store/' + 'stock.json', 'utf8', (err, data) => {
            res.send(data);
        });
    }catch(err){
        console.log(err.message)
    }
})

//Server listener ahead

app.listen(port, ()=>{
    console.log('Shop is now active, listening on port '+port)
})