const express = require('express');

const app = express();
const port = process.env.PORT || 3000
const main = require('../routes/index')
app.use('/api/main', main)
app.listen(port)