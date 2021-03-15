const express = require('express')
const app = express()

require('dotenv').config();

const port = 8080;
const name = process.env.NAME;

app.get('/', (req, res) => {
    res.send(`Hello World! My name is: ${name}`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
