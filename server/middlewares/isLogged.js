const jwt = require("jsonwebtoken");

const isLogged = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JSONWEBTOKENSECRET); // 🔐 Secret key
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token", success: false });
    }
};


module.exports = isLogged;