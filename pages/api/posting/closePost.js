import { PostingModel, CompanyModel, ApplicationModel } from "../../../models";
import { applicationStatus, userTypes } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import nextConnect from "next-connect";

export default nextConnect()
    .all(connectToDB)
    .put(fetchUser, async (req, res) => {
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
                let posting = await PostingModel.findById(postingId);
                if (posting) {
                    // Closing all applications
                    await ApplicationModel.updateMany(
                        { posting: postingId, status: applicationStatus.applied },
                        { $set: { status: applicationStatus.closed } },
                        { new: true },
                    );

                    posting = await PostingModel.findByIdAndUpdate(postingId,
                        { $set: { isClosed: true } },
                        { new: true },
                    );
                    return res.json(posting);
                } else return res.status(400).json({
                    error: "Arguments Error",
                    message: "No post found with given id"
                });
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Posting Id not given"
                });
            }
        }
        catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    }
    );