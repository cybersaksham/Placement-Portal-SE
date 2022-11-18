import { connectToDB, fetchUser } from "../../middlewares";
import { modelTypes } from "../../lib/userType";
import router from "../../lib/router";

export default router
    .all(connectToDB)
    .post(fetchUser, async (req, res) => {
        try {
            // Finding User
            const userId = req.user.id;
            const type = req.user.type;
            const user = await modelTypes[type].findById(userId).select("-password");
            return res.send(user);
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    });