const express = require('express');
const functions = require('../controller/index');
const router = express.Router();

router.get('/', (req, res) => {
    functions.main().then((response) => {
        res.json(response);
    })
    .catch((error) => {
        res.json(error);
    })
})
module.exports = router;