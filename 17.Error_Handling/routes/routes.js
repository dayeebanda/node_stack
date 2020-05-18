const authRoute = require('./authRoute');
const deshboardRoute = require('./deshboardRoute');

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


        if (r.path == '/') {
            app.get(r.path, r.handler)

        } else {

            app.use(r.path, r.handler)
        }
    })

}