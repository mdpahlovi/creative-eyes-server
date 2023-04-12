const User = require("../models/user.model");

exports.getUser = async (req, res) => {
    const { email } = req.params;
    const user = await User.findOne({ email: email });
    res.send(user);
};
exports.getAllUser = async (req, res) => {
    const users = await User.find({});
    res.send(users);
};

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
