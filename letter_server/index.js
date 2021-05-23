const express = require('express')
const app = express()
const mysql = require('mysql2')
const config = require("./config/config.json");
const home = require("./routes/home")
const letters = require("./routes/letters")

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use("/home", home);
app.use("/letters", letters);
//use the home.js file for url beginning with /home

const db = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
})

app.get("/", (req, res) => {
    const sql = "select * from letters where id = 1"
    db.query(sql, (err, result)=>{
        res.send(result[0].content)
    } )
})

app.listen(3001, () => {
    console.log('running on port 3001 (server)')
})
