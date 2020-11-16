const express = require('express');
const router = express.Router();
const ai = require('./controllers/ai');
const db = require('./controllers/db');

router.post("/generateText", ai.generate)
router.post("/saveText", db.save)

module.exports = router;
