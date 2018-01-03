const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
require('./services/passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const keys = require('./config/keys');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const multer = require('multer');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,{
    useMongoClient:true
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:keys.cookieKey,
    resave:true,
    saveUninitialized:false,
    cookie:{maxAge:30 * 24 * 60 * 60 * 1000},
    store: new MongoStore({url:keys.mongoURI})
}));
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
require('./routes/appRoutes')(app);

app.listen(5000,()=>{
    console.log('Server is running in port : 5000');
});