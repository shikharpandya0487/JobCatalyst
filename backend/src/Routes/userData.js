const express = require('express');
const router = express.Router();
const profileController = require('../controllers/userDataController.js');

router.get('/profile/:id', profileController);

module.exports = router;
