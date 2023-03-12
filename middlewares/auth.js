const JWT = require("jsonwebtoken");


module.exports = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.header("Authorization");
        if (!token) return res.status(401).send("Access Denied. No valid Token");
        // check the Token with the verify
        const payload = JWT.verify(token, process.env.JWT_Key);
        // save the payload in the request object
        req.payload = payload;

        next()
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}