const User = require("../models/user.model");
const jwt = require( "jsonwebtoken" );
require('dotenv').config();

exports.createController = (req, res)=>{
    if(!req.body.email || !req.body.password){
        res.status(400).send({message: " Email and Password can't be Empty!"});
        return;
    };
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
    })
    User.create(newUser, (error, data)=> {
        if(error){
            res.status(400).send({ message: error.message || "Some error"});
        }
        else{
            res.status(201).send(data);
        }
    });
};

exports.loginController = (req, res)=>{
    if(!req.body.email || !req.body.password){
        res.status(400).send({message : "Email ans Password can't be Empty!!"})
        return;
    }
    User.loginByEmailAndPassword(req.body.email , req.body.password , (err, User)=> {
        if(hasError(res, err))
        return;
    const accessToken = generateAccessToken(User.id);
    const refreshToken = generateRefreshToken(accessToken, User.id);
    res.json({accessToken , refreshToken});
    });

};

generateAccessToken = (userId)=>{
    return jwt.sign({userId:userId} , process.env.SECRET_KEY, {expiresIn: '1h'});

}

generateRefreshToken = (accessToken , userId)=>{
    return jwt.sign({userId:userId , accessToken:accessToken}, process.env.REFRESH_KEY, {expiresIn: '7d'});

}

hasError = (res, error) =>{
    if(error){
        if(error.kind === 'not_found'){
            res.status(401).send({message: "Invalid email or password"});
        }
        else{
            res.status(500).send({message: "Some error"});
        }
        return true;
    }
}