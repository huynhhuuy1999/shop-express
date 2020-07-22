const express = require('express');
const controller = require('../controller/product.controller');

const router= express.Router();

router.get('/detail/:id',controller.detailProduct);
router.get('/menu',controller.menuProduct);

module.exports= router;
