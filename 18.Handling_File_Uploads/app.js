// user here .env 
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const config = require('config');
const chalk = require('chalk');
const flash = require('connect-flash')

const setMiddleware = require('./middleware/middleware')
const setRoutes = require('./routes/routes')




const MONGOOSE_URI = 'mongodb+srv://habib:emdad1234@cluster0-2pvwn.mongodb.net/exp-blog'


const app = express()

// setup view Engine
app.set('view engine', 'ejs');
app.set('views', 'views')



//using  middleware from Middleware directory
setMiddleware(app)


//using Routes from Route Directory
setRoutes(app)


app.use((req, res, next) => {
    let error = new Error('404 not Found', { flashMessage: {} })
    error.staus = 404;
    next(error)

})

app.use((error, req, res, next) => {
    if (error.staus == 404) {
        return res.render('pages/error/404')

    }
    console.log(error)
    res.render('pages/error/500')

})


const PORT = process.env.PORT || 8080;

mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true })

.then(() => {
    console.log(chalk.blue('Database Connected'))
    app.listen(PORT, () => {
        console.log('server is running on  PORT' + PORT)
    })

})

.catch(e => {

    return console.log(e)
});