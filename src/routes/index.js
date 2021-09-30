const connection = require('../database/database')

const router = require('express').Router()

router.get('/', (req, res) => {
    connection.query("SELECT * FROM marca", (err, results, fields) => {
        if(err) throw err;
        console.log("Los resultados son")
        res.render("index", {
            results
        })
    })
})




module.exports = router;