const express = require('express');
const router  = express.Router();
const { getPrograms, comparePrograms } = require('../controllers/programController');

// /compare has to be defined before /:id
// otherwise Express would try to treat the string "compare" as an ID param
router.get('/compare', comparePrograms);
router.get('/', getPrograms);

module.exports = router;
