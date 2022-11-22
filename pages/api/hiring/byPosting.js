import { PostingModel } from "../../../models";
import { hiringTypes } from "../../../lib/types";
import { connectToDB } from "../../../middlewares";
import router from "../../../lib/router";

export default router
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { postingId } = req.query;

            if (postingId) {
                const posting = await PostingModel.findById(postingId);
                if (posting) {
                    hiringTypes[posting.type].find({ posting: postingId })
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