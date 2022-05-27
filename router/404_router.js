const express = require('express');
const router = express.Router();

router.use((req, res) => {
    res.send('404 not found');
});

module.exports = router;