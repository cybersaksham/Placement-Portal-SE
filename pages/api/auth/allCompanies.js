import { CompanyModel } from "../../../models";
import { connectToDB } from "../../../middlewares";
import nextConnect from "next-connect";

export default nextConnect()
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const company = await CompanyModel.find().select("-password");
            return res.json(company);
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    });