const User = require("../models/user.model");

exports.getAndCreateUser = async (req, res) => {
    const user = req.body;
    const alreadyExist = await User.findOne({ email: user.email });
    if (alreadyExist?._id) {
        res.send(alreadyExist);
    } else {
        const newUser = new User(user);
        const result = await newUser.save();
        res.send(result);
    }
};
