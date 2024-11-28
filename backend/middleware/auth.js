const jwt = require("jsonwebtoken");
const User = require("../models/User");

authJwt = async (req, res, next) => {
    const token = req.cookies.jwt; // Ensure jwt is sent as a cookie
    if (!token) {
        return res.status(403).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.access_key); // Decode the token
        const user = await User.findById(decoded.id); // Find user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user; // Attach user to the request
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};



module.exports = authJwt
