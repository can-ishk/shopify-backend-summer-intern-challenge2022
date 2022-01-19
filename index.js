const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser')
const port = 3030;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes ahead

//stock = []
stock = [
    {
        "name": "ka",
        "cost": "4",
        "quantity": "3"
    },
    {
        "name": "ab",
        "cost": "3",
        "quantity": "7"
    },
    {
        "name": "cd",
        "cost": "3",
        "quantity": "6"
    }
]

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
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(stock));
        res.end();
    }catch(err){
        console.log(err.message)
    }
})

app.post('/shop/add', (req,res)=>{
    try{
        const item = req.body;
        const search = stock.filter((i)=> {return i.name == item.name})
        if(search.length>0){
            res.status(406) //Not Acceptable
            console.log()
            res.end("Bad Request: Item already exists. Please use 'edit' instead of 'add'")
        }
        else{
            stock.push(item)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(stock));
            res.end();
        }
    }
    catch(err){
        console.log(err.message)
    }
})

app.put('/shop/edit', (req,res)=>{
    try{
        const item = req.body;
        const search = stock.filter((i)=> {return i.name == item.currName})
        if(search.length>0){
            i = stock.findIndex(it=>it.name==item.currName)
            if(item.name) stock[i].name = item.name 
            if(item.cost) stock[i].cost = item.cost
            if(item.quantity) stock[i].quantity = item.quantity
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(stock));
            res.end();
        }
        else{
            res.status(406) //Not Acceptable
            console.log()
            res.end("Bad Request: Item doesn't exist. Please use 'add' instead of 'edit'")
        }

    }
    catch(err){
        console.log(err.message)
    }
})
app.delete('/shop/delete', (req,res)=>{
    try{
        const item = req.body;
        const search = stock.filter((i)=> {return i.name == item.name})
        if(search.length>0){
            i = stock.findIndex(it=>it.name==item.name)
            stock.splice(i,1)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(stock));
            res.end();
        }
        else{
            res.status(406) //Not Acceptable
            res.end("Bad Request: Item doesn't exist.")
        }

    }
    catch(err){
        console.log(err.message)
    }
})

//Server listener ahead

app.listen(port, ()=>{
    console.log('Shop is now active, listening on port ' + port)
})