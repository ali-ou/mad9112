'use strict'

const carsRouter = require('./routes/cars')
const express = require('express')
const app = express()

app.use(express.json())
app.use('/api/cars',carsRouter)


const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))
