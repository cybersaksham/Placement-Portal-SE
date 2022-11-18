import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "NOT_SO_SECRET";

export default function fetchUser(req, res, next) {
    // Getting token
    const token = req.headers["auth-token"];

    // Verifying Token
    if (!token) {
        return res.status(401).json({
            error: "Authentication Error",
            message: "Please authenticate using a valid token."
        });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Authentication Error",
            message: "Please authenticate using a valid token."
        });
    }
};
