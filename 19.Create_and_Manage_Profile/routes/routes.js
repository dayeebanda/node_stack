const authRoute = require('./authRoute');
const deshboardRoute = require('./deshboardRoute');

//paly ground route
const playgroundRoute = require('../playground/play')
const uploadRoute = require('./uploadRoutes')


const routes = [


    {
        path: '/auth',
        handler: authRoute

    },
    {
        path: '/deshboard',
        handler: deshboardRoute
    },
    {
        path: '/uploads',
        handler: uploadRoute
    },
    {
        path: '/playground',
        handler: playgroundRoute
    },

    {
        path: '/',
        handler: (req, res) => {
            res.json({
                message: "hello Bangladesh"
            })
        }

    }

]

module.exports = app => {

    routes.forEach(r => {


        if (r.path == '/')
        {
            app.get(r.path, r.handler)

        } else
        {

            app.use(r.path, r.handler)
        }
    })

}