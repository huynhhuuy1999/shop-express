require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser') // cài để đọc cookie
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,
                                        useUnifiedTopology: true,
                                        useFindAndModify: false});

const port = 3000;
const app = express();

const middlewareGetUsername = require('./middleware/user.middleware');
const middlewareSession = require('./middleware/session.middleware');

const homeRoute = require('./routes/home.route');
const productRoute = require('./routes/product.route');
const accountRoute = require('./routes/account.route');
const orderRoute = require('./routes/order.route');
const testRoute = require('./routes/test.route');

var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views'); // tạo thư mục view default

app.use(express.static('public'));

// cấu hình để chạy bodyParser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//test API
app.use('/test',testRoute);
//cấu hình chạy cookỉe parser
app.use(cookieParser(process.env.SESSION_SECRET)); // tạo dãy cookie bảo mật

// middleware cho tất cả các router
app.use(middlewareGetUsername.getUsername);
app.use(middlewareSession.session);

//cấu hình các path đầu của router
app.use('/home', homeRoute);
app.use('/product',productRoute);
app.use('/account',accountRoute);
app.use('/order',orderRoute);
app.use('/test',testRoute);

app.get('/',homeRoute);// mặc định chạy path đầu tiên của web

app.listen(port,function(){
    console.log("Server starting "+port+"...");
});