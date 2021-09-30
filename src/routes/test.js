const router = require('express').Router()
const connection = require('../database/database')

router.get('/', (req, res) => {
    connection.query("SELECT * FROM test", (err, results) => {
        if (err) throw err;
        res.render("test", {
            results
        })
    })
})


module.exports = router