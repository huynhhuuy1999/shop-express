const express = require('express');

const controller = require('../controller/account.controller.js');
const validate = require('../validate/account.validate');

const router = express.Router();

router.get('/login',controller.login);
router.post('/login',validate.postLogin,
                    controller.postLogin);
router.get('/register',controller.register);
router.post('/register',validate.postRegister
                        ,controller.postRegister);

module.exports = router;