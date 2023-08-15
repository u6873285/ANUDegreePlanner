const express = require('express')
const Pool = require('pg').Pool

const app = express()
const port = 3000

const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // change this to aws endpoint
  database: 'postgres', // change to degree planner - idk name yet - course_data
  password: 'test', // aws password is 'degreeplanner'
  port: 5432,
})

app.listen(port, () => {
console.log(`App running on port ${port}.`)
})


// initial endponts to be changed once database is fully set up
// currently it is pointed to local postgres server

app.get('/', (request, response) => {
    response.send('Node.js, Express, and Postgres API \n wassup' )
  })


app.get("/yo", (req, res) => {
    pool.query("SELECT * FROM course_data WHERE subject = 'COMP' LIMIT 2;", (error, results) => {
        if (error) {
            throw error
        }
        res.send(results.rows)
})})

app.get("/yo/:num", (req, res) => {
    var num = req.params.num
    num.replace(":",'') // this is needed for some reason when using the variable in the query
    num = parseInt(num)
    pool.query( `SELECT * FROM course_data WHERE subject = 'COMP' LIMIT ${num}`, (error, results) => {
        if (error) {
            throw error
        }
        res.send(results.rows)
})})
