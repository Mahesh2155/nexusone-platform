const jwt = require("jsonwebtoken");


// Generate Access Token
const generateAccessToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            tenantId: user.tenantId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );

};


// Generate Refresh Token
const generateRefreshToken = (userId) => {

    return jwt.sign(
        {
            id: userId
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    );

};


// Verify Token
const verifyToken = (token, secret) => {

    return jwt.verify(
        token,
        secret
    );

};


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
};