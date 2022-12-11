import { ApplicationModel, CompanyModel, PostingModel } from "../../../models";
import { applicationStatus, userTypes } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import nextConnect from "next-connect";

export default nextConnect()
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
                    let data = await PostingModel.findById(postingId)
                        .populate({ path: "company", select: "-password" })
                    if (data.company.id != userId) {
                        return res.status(400).json({
                            error: "Arguments Error",
                            message: "No posting found with given id"
                        });
                    }

                    data = await ApplicationModel.find({
                        posting: postingId, $or: [
                            { status: applicationStatus.applied },
                            { status: applicationStatus.accepted },
                            { status: applicationStatus.rejected },
                        ]
                    })
                        .populate({ path: "student", select: "-password" }).lean();
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