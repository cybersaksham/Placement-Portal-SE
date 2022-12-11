import { PostingModel } from "../../../models";
import { hiringTypes } from "../../../lib/types";
import { connectToDB } from "../../../middlewares";
import nextConnect from "next-connect";

export default nextConnect()
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { postingId } = req.query;

            if (postingId) {
                const posting = await PostingModel.findById(postingId);
                if (posting) {
                    let data = await hiringTypes[posting.type].find({ posting: postingId })
                        .populate({
                            path: "posting",
                            populate: { path: "company", select: "-password" }
                        })
                        .populate({ path: "student", select: "-password" })
                        .lean();
                    Array.from(data).forEach((el, i) => {
                        let newData = el;
                        newData.company = newData.posting.company;
                        delete newData.posting.company;
                        data[i] = newData;
                    })
                    return res.json(data);
                } else return res.status(400).json({
                    error: "Arguments Error",
                    message: "No posting found with given id"
                });
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Posting Id not given"
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })