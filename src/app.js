const express = require('express')
const app = express()


//SETTINGS
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
    res.send("okidoki")
})



app.listen(app.get('port'), () => {
    console.log(`Conectado al servidor en el PORT: ${app.get('port')}`)
})