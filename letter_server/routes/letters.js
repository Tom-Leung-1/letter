"use strict";
const express = require("express");
let router = express.Router();
const mysql = require('mysql2')
const config = require("../config/config.json");

const db = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
})

router.route("/").get((req, res) => {
    const sqlSelect = "Select * from letters ORDER BY RAND() LIMIT 1"
    db.query(sqlSelect, (err, result)=> {
        res.json(result)
    })
});

module.exports = router;