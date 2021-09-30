const mysql = require('mysql')


let connection = mysql.createConnection({
    host: 'localhost',
    user:"keyzen",
    password:"$Elmasmejor0910",
    database:"autonueve"
})

connection.connect((err) => {
    if (err) throw err;
    console.log("conectados a la base de datos")
})

module.exports = connection;