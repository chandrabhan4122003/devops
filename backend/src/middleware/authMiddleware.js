const jwt = require('jsonwebtoken');
const user = require('../models/user');

const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;
    if(token && token.startsWith("Bearer")){
        try{
            token = token.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await user.findById(decode.id).select("-password");
            next();
        }
        catch(err){
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
}

module.exports = authMiddleware;