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


router.route("/postLetter").post((req, res) => {
    const content = req.body.content;
    const name = req.body.name;
    const sqlInsert = "Insert Into letters (content, name) Values (?,?)"
    db.query(sqlInsert, [content, name], (err, result)=> {
        res.send("success")
    })
});

module.exports = router;