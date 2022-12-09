import { AdminModel } from "../../../models";
import { connectToDB, fetchUser } from "../../../middlewares";
import { userTypes, modelTypes } from "../../../lib/types";
import router from "../../../lib/router";

export default router
    .all(connectToDB)
    .put(fetchUser, async (req, res) => {
        try {
            // Finding User
            const userId = req.user.id;
            if (req.user.type !== userTypes.admin) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "You are not logged in as an admin"
                })
            }

            const admin = await AdminModel.findById(userId).select("-password");
            if (!admin) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "User not found"
                });
            }

            const { id, type } = req.body;
            let user = await modelTypes[type].findById(id);

            if (user) {
                user = await modelTypes[type].findByIdAndUpdate(id,
                    { $set: { isBanned: true } },
                    { new: true },
                );
                return res.json(user);
            } else return res.status(400).json({
                error: "Arguments Error",
                message: "No user found with given id"
            });
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    });