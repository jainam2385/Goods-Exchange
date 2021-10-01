const jwt = require("jsonwebtoken");
const AuthenticationError = require("../errors/authenticationError");

module.exports.verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return next(
            new AuthenticationError("Authentication token missing.", 403)
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.SERVER_SECRET_KEY);

        req.user = decoded;
        next();
    } catch (err) {
        return next(
            new AuthenticationError("Invalid authentication token", 401)
        );
    }
    return next();
};