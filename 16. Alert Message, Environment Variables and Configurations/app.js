// user here .env 
require('dotenv').config()


const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')
const config = require('config');





// user here cookies 
//const cookieParser = require('cookie-parser')

let DB_ADMIN = process.env.DB_ADMIN
let DB_PASSWORD = process.env.DB_PASSWORD

const MONGOOSE_URI = 'mongodb+srv://habib:emdad1234@cluster0-2pvwn.mongodb.net/exp-blog'


"mongodb + srv: //${config.get('db - user ')}: ${config.get('db - password ')}@cluster0-2pvwn.mongodb.net/exp-blog"

const store = new MongoDBStore({
    uri: MONGOOSE_URI,
    databaseName: 'exp-blog',
    collection: 'mySessions',
    expires: 100 * 60 * 60 * 2,
})


//Import Routes
const authRoutes = require('./routes/authRoute')
const deshbordRoutes = require('./routes/deshboardRoute')


//import Middleware 
const { bindUserWithRequest } = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')


//playground Routes
//const validatorRoutes = require('./playground/validator')


const app = express()

console.log(config.get('name'))

//use hare config file 
// const config = require('./config/config')
// if (app.get('env').toLowerCase() == 'development') {

//     console.log(config.dev.name)
// } else {

//     console.log(config.prod.name)
// }


// setup view Engine

app.set('view engine', 'ejs');

app.set('views', 'views')

// middelaware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    //express.Router(),
    //cookieParser(), // use here cookies

    // user here session 

    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        //secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        // cookie: {
        //     maxAge: 60 * 60 * 2,
        //     //secure: true
        // }

        store: store,
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()

]


app.use(middleware)
    //app.use(express.static(__dirname + '../public'));


app.use('/auth', authRoutes)

app.use('/deshboard', deshbordRoutes)


// how to check current Environment
//console.log(process.env.NODE_ENV)
//console.log(app.get('env'))
//production mode here is give bellow:
//set NODE_ENV=PRODUCTION
// set NODE_ENV=development

// if (app.get('env').toLowerCase() == 'development') {

//     app.use(morgan('dev'))
// }



//playground Use here for validator

//app.use('/playground', validatorRoutes) // should be remove


app.get('/', (req, res) => {

    //res.render('pages/auth/signup', { title: 'Create a New Account' })


    res.json({
        message: "hello Bangladesh"
    })
})

const PORT = process.env.PORT || 8080;

mongoose
    .connect(

        MONGOOSE_URI
        //'mongodb+srv://habib:emdad1234@cluster0-2pvwn.mongodb.net/exp-blog?retryWrites=true&w=majority'
        // 'mongodb+srv:// ${DB_ADMIN}: ${DB_PASSWORD} @cluster0-2pvwn.mongodb.net/exp-blog?retryWrites=true&w=majority'

        , { useNewUrlParser: true })

.then(() => {
    console.log('Database Connected')
    app.listen(PORT, () => {

        console.log('server is running on  PORT' + PORT)
    })

})

.catch(e => {

    return console.log(e)
});