//user, title, bio, profilePic, link: {website, fb, twi}, posts, bookmark

const { Schema, Model } = require('mongoose')
    //const User = require('./User')

//const Post = require('./Post')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100

    },
    bio: {

        type: String,
        trim: true,
        maxlength: 500
    },
    profilePic: String,
    links: {

        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    bookmark: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'

    }]





}, { timestamps: true })

const Profile = model('Profile', profileSchema)

module.exports = Profile;