const express = require('express')
const app = express()

app.use(express.static('tiny'));

app.listen(3000)
