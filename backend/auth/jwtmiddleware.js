const jwt = require('jsonwebtoken');

// Authenticate the token
const tokenAuth = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = user; //decoded user
        next();

    });
}

module.exports = tokenAuth;