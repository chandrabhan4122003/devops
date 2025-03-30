const User = require('../models/user');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    const { email, password, role } = req.body;
    const alreadyPresent = await User.findOne({ email });
    if(alreadyPresent) {
        res.status(400).send({ message: "User already exists" });
        return;
    }
    const user = await User.create({
        email,
        password,
        role,
    })
    if(user){
        res.status(200).send({
            msg: "User registered",
            _id: user._id,
            email: user.email,
            role: user.role,
        })
    }else {
        res.status(400).send({ message: "Invalid user data" });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.status(200).send({
            message: "User logged in",
            _id: user._id,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    }else{
        res.status(401).send({ message: "Invalid email or password" });
    }
}

const logoutUser = async (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).send({ message: "User logged out" });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}