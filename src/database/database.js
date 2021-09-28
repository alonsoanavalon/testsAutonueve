const config = require('./cfg');
const mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host:'uh1.hnc.cl',
    user:'mobalzen_keyzen',
    password:'keyzencl123',
    database:'mobalzen_autonueve',
    port:'3306',
})

exports.getBrands = function(req, res) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err)
            return
        }

        sql = "SELECT * FRoM marca"

        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err)
                return
            }
            
            res.render("index", {
                results
            })
            
            connection.release()
        })

        
    })



}



