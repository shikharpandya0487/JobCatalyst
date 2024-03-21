const express = require('express');
const router = express.Router();
const profileController = require('../controllers/userDataController.js');
// const getOldMsg=require('../controllers/getOldMsg.js')

router.get('/profile/:id', profileController);
// router.get('/messages/:userId',getOldMsg)

module.exports = router;
