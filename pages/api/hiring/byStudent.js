import { StudentModel } from "../../../models";
import { hiringTypes, userTypes } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import router from "../../../lib/router";

export default router
    .all(connectToDB)
    .get(fetchUser, async (req, res) => {
        try {
            // Finding User
            const userId = req.user.id;
            if (req.user.type !== userTypes.student) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "You are not logged in as an student"
                })
            }

            let student = await StudentModel.findById(userId).select("-password");
            if (!student) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "You are not logged in as an student"
                });
            }

            const { type } = req.query;

            hiringTypes[type].find({ student: userId })
                .populate({
                    path: "posting",
                    populate: { path: "company", select: "-password" }
                })
                .populate({ path: "student", select: "-password" })
                .exec((err, data) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Unknown Error",
                            message: err.message
                        });
                    }
                    else return res.send(data);
                });
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })