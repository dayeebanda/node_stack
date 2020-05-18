//name, email, Password and Profile

const { Schema, model } = require('mongoose')
    //const Profile = required('./Profile')

const userSchema = new Schema({
    username: {

        type: String,
        trim: true,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        trim: true,

    },
    profile: {

        type: Schema.Types.ObjectId,
        ref: 'Profile'

    },

}, { timestamps: true })



const User = model('User', userSchema);

module.exports = User;