const config = require('./cfg');
const mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database
})

exports.getBrands = function(req, res) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err)
            return
        }

        sql = "SELECT * FROM marca"

        connection.query(sql, (err, results) => {
            connection.release()
            if (err) {
                console.error(err)
                return
            }

            res.render("index", {
                results
            })

        })
        
    })



}



