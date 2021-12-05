const express = require('express');
const main = require('../controller/index')
const router = express.Router();

async function init (req, res) {
    await main(req, res)
}
router.get('/', (req, res) => {
    main().then((response) => {
        res.json(response);
    })
    .catch((error) => {
        res.json(error);
    })
})

module.exports = router;