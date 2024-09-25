const jwt = require('jsonwebtoken');

// Authenticate the token
const tokenAuth = (req,res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
     console.log(authHeader);
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