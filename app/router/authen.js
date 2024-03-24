const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message : "Access denied. No token provided."});
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
        
    } catch (e) {
        res.status(400).json({message: 'Invalid Token'});
    }
};
