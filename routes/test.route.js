const express = require('express');
const controller = require('../controller/test.controller');
const { route } = require('./home.route');

const router = express.Router();
router.get('/test',controller.test);
router.post('/postAPI',controller.createTest);
router.get('/getListTest',controller.getListTest);
router.delete('/deleteTest', controller.deleteTest);
router.put('/updateTest',controller.updateTest);
module.exports = router;