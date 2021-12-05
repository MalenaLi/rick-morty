const express = require('express');
const main = require('../controller/index')
const router = express.Router();
var jsonData;
async function init (req, res) {
    jsonData = await main(req, res)
}
// init ()
router.get('/', (req, res) => {
    init(req, res)
})


module.exports = router;