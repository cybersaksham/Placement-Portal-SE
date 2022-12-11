import { ApplicationModel, StudentModel } from "../../../models";
import { modelTypes, userTypes } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import nextConnect from "next-connect";

export default nextConnect()
    .all(connectToDB)
    .get(fetchUser, async (req, res) => {
        try {
            // Finding User
            const userId = req.user.id;
            const type = req.user.type;

            if (type !== userTypes.student) {
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

            let data = await ApplicationModel.find({ student: userId })
                .populate({
                    path: "posting",
                    populate: { path: "company", select: "-password" }
                }).lean();
            data.company = data.posting.company;
            delete data.posting.company;
            let moreDetails = await modelTypes[data.posting.type].findById(data.posting._id);
            data.posting.details = moreDetails;
            return res.send(data);
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })