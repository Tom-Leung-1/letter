"use strict";
const express = require("express");
let router = express.Router();
const mysql = require('mysql2')
const config = require("../config/config.json");

const db = mysql.createPool({
    host: config.host,
    port: 3306,
    user: config.user,
    password: config.password,
    database: config.database,
})

router.route("/").get((req, res) => {
    console.log("getting a random letter")
    const sqlSelect = "Select * from letters ORDER BY RAND() LIMIT 1"
    db.query(sqlSelect, (err, result)=> {
        console.log(err)
        console.log(result)
        res.json(result)
    })
});

module.exports = router;