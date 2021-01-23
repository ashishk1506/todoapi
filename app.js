const express = require('express')

const PORT = process.env.PORT || 3000
const app = express()

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const items = require('./routes/items')

app.use('/',items)


app.listen(PORT, async()=>{
    console.log(`listening to port ${PORT}`)
})
