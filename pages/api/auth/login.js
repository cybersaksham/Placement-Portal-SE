import { connectToDB } from "../../../middlewares";
import { modelTypes, userTypes } from "../../../lib/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nextConnect from "next-connect";

const JWT_SECRET = process.env.JWT_SECRET || "NOT_SO_SECRET";

export default nextConnect()
    .all(connectToDB)
    .post(async (req, res) => {
        try {
            const { id, password, type } = req.body;

            let user = await modelTypes[type].findOne(
                userTypes.student === type
                    ? { sid: String(id).toUpperCase() }
                    : { email: id }
            );
            if (!user) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "User not found"
                });
            }

            // Comparing Password
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "Password is wrong"
                });
            }

            // Generating Token
            const data = {
                user: { id: user.id, type },
            };
            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({ authToken });
        }
        catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    });