const express = require('express')

const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

//Routes
const indexRoutes = require('./routes/index')
const testRoutes = require('./routes/test')

//Initialization
const app = express()








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




app.use('/', indexRoutes)
app.use('/test', testRoutes)









app.listen(app.get('port'), () => {
    console.log(`Conectado al servidor en el PORTT: ${app.get('port')}`)
})