const express = require('express');
const router = express.Router();
const { getSkills } = require('../controllers/skillController');

router.get('/', getSkills);

module.exports = router;
