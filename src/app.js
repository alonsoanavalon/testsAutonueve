const express = require('express')

const mysql = require('mysql');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

//Routes
const indexRoutes = require('./routes/index')

//Initialization
const app = express()
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


//SETTINGS

const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars), 
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',

    helpers: {
        loud: function (aString) {
            return aString.toUpperCase()
        }
}})

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//Routes




app.get('/', (req, res) => {
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
})









app.listen(app.get('port'), () => {
    console.log(`Conectado al servidor en el PORT: ${app.get('port')}`)
})