const connection = require('../database/database')

const router = require('express').Router()

connection.query("SELECT * FROM marca", (err, results, fields) => {
    if(err) throw err;
    console.log("Los resultados son")
    console.log(results)
    res.render("index")
})


module.exports = router;