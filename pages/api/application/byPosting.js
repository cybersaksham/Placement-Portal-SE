import { ApplicationModel, CompanyModel, PostingModel } from "../../../models";
import { userTypes } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import router from "../../../lib/router";

export default router
    .all(connectToDB)
    .get(fetchUser, async (req, res) => {
        try {
            // Finding User
            const userId = req.user.id;
            const type = req.user.type;

            if (type !== userTypes.company) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "You are not logged in as a company"
                })
            }

            let company = await CompanyModel.findById(userId).select("-password");
            if (!company) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "You are not logged in as a company"
                });
            }

            const { postingId } = req.query;

            if (postingId) {
                const posting = await PostingModel.findById(postingId);
                if (posting) {
                    PostingModel.findById(postingId)
                        .populate({ path: "company", select: "-password" })
                        .exec((err, data) => {
                            if (data.company.id != userId) {
                                return res.status(400).json({
                                    error: "Arguments Error",
                                    message: "No posting found with given id"
                                });
                            }
                        });

                    ApplicationModel.find({ posting: postingId })
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