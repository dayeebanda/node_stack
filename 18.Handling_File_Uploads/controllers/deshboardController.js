const Flash = require('../utilis/Flash')

exports.deshboardGetController = (req, res, next) => {

    res.render('pages/deshboard/deshboard', {
        title: 'My Deshboard',
        flashMessage: Flash.getMessage(req)
    })

}