import { connectToDB, fetchUser } from "../../../middlewares";
import { modelTypes, userTypes } from "../../../lib/types";
import nextConnect from "next-connect";
import { AdminModel, CompanyModel, StudentModel } from "../../../models";

export default nextConnect()
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { userId } = req.query;
            let admin = await AdminModel.findById(userId).select("-password").lean();
            let company = await CompanyModel.findById(userId).select("-password").lean();
            let student = await StudentModel.findById(userId).select("-password").lean();
            let user = admin || company || student;
            if (user) {
                if (admin) user.usertype = userTypes.admin;
                else if (company) user.usertype = userTypes.company;
                else if (student) user.usertype = userTypes.student;
                return res.json(user);
            }
            else return res.status(400).json({
                error: "Arguments error",
                message: "No user exist with the given id"
            });
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })
    .post(fetchUser, async (req, res) => {
        try {
            // Finding User
            const userId = req.user.id;
            const type = req.user.type;
            let user = await modelTypes[type].findById(userId).select("-password").lean();
            if (!user) return res.status(401).json({
                error: "Authentication error",
                message: "Authentication token expired"
            });
            user.usertype = type;
            return res.json(user);
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    });