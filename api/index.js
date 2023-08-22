const express = require('express')
// const Pool = require('pg').Pool

const { MongoClient } = require("mongodb")
const uri = "mongodb://127.0.0.1:27017/" // mongodb://localhost:27017 is address for local install
const client = new MongoClient(uri)


// let conn = client.connect();
let db = client.db("yo");

const app = express()
const port = 3000

app.listen(port, () => {
console.log(`App running on port ${port}.`)
})


// // initial endponts to be changed once database is fully set up
// // currently it is pointed to local postgres server

app.get('/', (request, response) => {
    response.send('Node.js, Express, and Postgres API nvm its actually mongodb \n wassup' )
  })

app.get("/course=:id", async (req, res) => {
    let id = req.params.id
    pars = parseInt(pars)
    // console.log(pars)
    let collection = await db.collection("uhm2");
    let query = {Course_ID: id};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

app.get("/yo", async (req, res) => {
    let collection = await db.collection("uhm2");
    let query = {Subject: "COMP"};
    let result = await collection.find(query).limit(3);
    let results_list = [];
    for await (const doc of result){
        results_list.push(doc)
    }

    if (!result) res.send("Not found").status(404);
    else res.send(results_list).status(200);

})
