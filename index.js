const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const objectsToCsv = require("objects-to-csv");
const port = 3030;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes ahead

//stock array represents memory/database for storage
stock = [];
/*
item objecct format: 
{
    prodId: Unique, primary key, Alphanumeric String.
    name: string
    cost: float
    quantity: int
    ... etc
}
*/

//Route to test if server is online.
app.get("/", (req, res) => {
  try {
    res.send("Welcome");
  } catch (err) {
    console.log(err.message);
  }
});

//Returns  items in stock.
app.get("/shop", (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(stock));
    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

//Adds item to stock.
app.post("/shop/add", (req, res) => {
  try {
    const item = req.body;
    if (!item.prodId) {
      res.status(400); //Bad Request
      res.end("Bad Request: prodId cannot be empty");
    } else {
      const search = stock.filter((i) => {
        return i.prodId == item.prodId;
      });
      if (search.length > 0) {
        res.status(406); //Not Acceptable
        console.log();
        res.end("Item already exists. Please use 'edit' instead of 'add'");
      } else {
        stock.push(item);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(stock));
        res.end();
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

//Edit an existing item.
app.put("/shop/edit", (req, res) => {
  try {
    const item = req.body;
    if (!item.prodId) {
      res.status(400); //Bad Request
      res.end("Bad Request: prodId cannot be empty");
    } else {
      const search = stock.filter((i) => {
        return i.prodId == item.prodId;
      });
      if (search.length > 0) {
        i = stock.findIndex((it) => it.prodId == item.prodId);
        //item properties:
        if (item.name) stock[i].name = item.name;
        if (item.cost) stock[i].cost = item.cost;
        if (item.quantity) stock[i].quantity = item.quantity;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(stock));
        res.end();
      } else {
        res.status(406); //Not Acceptable
        console.log();
        res.end("Item doesn't exist. Please use 'add' instead of 'edit'");
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

//Delete an item's record.
app.delete("/shop/delete", (req, res) => {
  try {
    const item = req.body;
    if (!item.prodId) {
      res.status(400); //Bad Request
      res.end("Bad Request: prodId cannot be empty");
    } else {
      const search = stock.filter((i) => {
        return i.prodId == item.prodId;
      });
      if (search.length > 0) {
        i = stock.findIndex((it) => it.prodId == item.prodId);
        stock.splice(i, 1);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(stock));
        res.end();
      } else {
        res.status(406); //Not Acceptable
        res.end("Bad Request: Item doesn't exist.");
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

//Generate and download a csv file of the entire stock.
app.get("/shop/csv", async (req, res) => {
  const generatedCsv = new objectsToCsv(stock);
  console.log(generatedCsv);
  await generatedCsv.toDisk("./temp.csv");
  res.download("/temp.csv", "generatedCSV.csv");
  res.status(200);
  res.send(generatedCsv);
  res.end();
});

//Server listener ahead

app.listen(port, () => {
  console.log("Shop is now active, listening on port " + port);
});
