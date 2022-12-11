import { hiringTypes, modelTypes } from "../../../lib/types";
import { connectToDB } from "../../../middlewares";
import nextConnect from "next-connect";

export default nextConnect()
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { hiringId, type } = req.query;
            if (hiringId) {
                const hiring = await hiringTypes[type].findById(hiringId);
                if (hiring) {
                    let data = await hiringTypes[type].findById(hiringId)
                        .populate({
                            path: "posting",
                            populate: { path: "company", select: "-password" }
                        })
                        .populate({ path: "student", select: "-password" })
                        .lean();
                    data.company = data.posting.company;
                    delete data.posting.company;
                    let moreDetails = await modelTypes[data.posting.type].findById(data.posting._id);
                    data.posting.details = moreDetails;
                    return res.json(data);
                } else return res.status(400).json({
                    error: "Arguments Error",
                    message: "No hiring found with given id"
                });
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Hiring Id not given"
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    });