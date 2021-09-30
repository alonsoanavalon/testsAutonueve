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
let connection = mysql.createConnection({
    host:"us-cdbr-east-04.cleardb.com",
    user:"b3df8acaa07ed3",
    password:"2f67e0c4",
    database:"heroku_8ced3ec1d677298"
})

connection.connect((err) => {
    if (err) throw err;
    console.log("conectados a la base de datos")
})

connection.query("SELECT * FROM marca", (err, results, fields) => {
    if(err) throw err;
    console.log("Los resultados son")
    console.log(results)
})

connection.end()



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

    res.send("Ok")

/*         sql = "SELECT * FRoM marca"

        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err)
                return
            }
            
            res.render("index", {
                results
            })
            

        }) */

     
    
})









app.listen(app.get('port'), () => {
    console.log(`Conectado al servidor en el PORTT: ${app.get('port')}`)
})