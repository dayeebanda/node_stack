const User = require("../models/User");
const Profile = require("../models/Profile");

exports.uploadProfilePics = async (req, res, next) => {

    if (req.file)
    {
        try
        {

            let profile = await Profile.findOne({ user: req.user._id });
            let profilePics = `/uploads/${ req.file.filename }`;
            if (profile)
            {
                await Profile.findByIdAndUpdate(
                    { user: req.user._id },
                    { $set: { profilePics } }
                )
            }
            await User.findByIdAndUpdate(
                { _id: req.user._id },
                { $set: { profilePics } }
            )
            res.status(200).json({

                profilePics
            })

        } catch (e)
        {
            res.status(500).json({
                profilePics: req.user.profilePics
            })
        }
    } else
    {
        res.status(500).json({
            profilePics: req.user.profilePics
        })
    }
}