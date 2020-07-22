const express = require('express');
const controller = require('../controller/order.controller');

const router = express.Router();
router.get('/addCart/:id',controller.addCart);

module.exports = router;