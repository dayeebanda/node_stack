const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);





// user here cookies 
//const cookieParser = require('cookie-parser')


const store = new MongoDBStore({
    uri: 'mongodb+srv://habib:emdad1234@cluster0-2pvwn.mongodb.net/exp-blog?retryWrites=true&w=majority',
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
        resave: false,
        saveUninitialized: false,
        // cookie: {
        //     maxAge: 60 * 60 * 2,
        //     //secure: true
        // }

        store: store,
    }),
    bindUserWithRequest(),
    setLocals()

]


app.use(middleware)
    //app.use(express.static(__dirname + '../public'));


app.use('/auth', authRoutes)

app.use('/deshboard', deshbordRoutes)

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
    .connect('mongodb+srv://habib:emdad1234@cluster0-2pvwn.mongodb.net/exp-blog?retryWrites=true&w=majority', { useNewUrlParser: true })

.then(() => {
    console.log('Database Connected')
    app.listen(PORT, () => {

        console.log('server is running on  PORT' + PORT)
    })

})

.catch(e => {

    return console.log(e)
});