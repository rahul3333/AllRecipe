const express=require('express');
const port=8000;
const ejs=require('ejs');
const app=express();
const session=require('express-session');
const cookieParser=require('cookie-parser');
var bodyParser = require('body-parser');
const db=require('./config/mongoose');
const path=require('path');
const passport= require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo')(session);
const layouts=require('express-ejs-layouts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(layouts);

app.use(express.static('assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'AllRecipe',
    secret:'My_Secret_Key',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:new MongoStore(
    {
      mongooseConnection:db,
      autoRemove:'disabled'  
    },
    function(err){
        console.log(err||'connect-mongodb setup ok');
        
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log('Error while Running Server');
        return;
    }
    console.log(`Server running on port ${port}`); 
});