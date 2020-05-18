const Flash = require('../utilis/Flash')
const Profile = require('../models/Profile')



exports.deshboardGetController = async(req, res, next) => {

    try {
        let profile = await Profile.findOne({ user: req.user._id })
        if (profile) {
            return res.render('pages/deshboard/deshboard', {
                title: 'My Deshboard',
                flashMessage: Flash.getMessage(req)
            })

        }
        res.redirect('/deshboard/create-profile')

    } catch (e) {
        next(e)


    }



}

exports.createProfileGetController = async(req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id })
        if (profile) {

            return res.redirect('/deshboard/edit-profile')

        }
        res.render('pages/deshboard/create-profile', {
            title: 'Create your Profile',
            flashMessage: Flash.getMessage(req)
        })

    } catch (e) {
        next(e)
    }
}

exports.createProfilePostController = (req, res, next) => {
    next()

}

exports.editProfileGetController = (req, res, next) => {
    next()

}

exports.editProfilePostController = (req, res, next) => {
    next()

}