import { CompanyModel, ApplicationModel } from "../../../models";
import { userTypes, hiringTypes, applicationStatus } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import nextConnect from "next-connect";

export default nextConnect()
    .all(connectToDB)
    .post(fetchUser, async (req, res) => {
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
            if (company.isBanned) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "You are currently banned by admin"
                });
            }

            const { applicationId } = req.body;

            if (applicationId) {
                const application = await ApplicationModel.findById(applicationId);
                if (!application) {
                    return res.status(400).json({
                        error: "Arguments Error",
                        message: "No application found with given id"
                    });
                }
                ApplicationModel.findById(applicationId)
                    .populate("posting")
                    .exec(async (err, data) => {
                        if (err) {
                            return res.status(400).json({
                                error: "Unknown Error",
                                message: err.message
                            });
                        }
                        else {
                            if (data.posting.company != userId) {
                                return res.status(400).json({
                                    error: "Authentication Error",
                                    message: "You are not logged in as a company"
                                });
                            }
                            if (data.status === applicationStatus.applied &&
                                !data.posting.isClosed) {
                                let newData = await ApplicationModel.findByIdAndUpdate(applicationId,
                                    { $set: { status: applicationStatus.rejected } },
                                    { new: true },
                                ).populate("posting")
                                    .populate({ path: "student", select: "-password" });
                                return res.json(newData);
                            } else {
                                return res.status(400).json({
                                    error: "Validation Error",
                                    message: "Cannot reject this application"
                                });
                            }
                        }
                    });
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Application Id not given"
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