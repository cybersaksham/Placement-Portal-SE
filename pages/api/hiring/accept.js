import { CompanyModel, ApplicationModel } from "../../../models";
import { userTypes, hiringTypes, applicationStatus } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import router from "../../../lib/router";

export default router
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
                                let hired = await hiringTypes[data.posting.type].create({
                                    posting: data.posting.id,
                                    student: data.student
                                })
                                await ApplicationModel.findByIdAndUpdate(applicationId,
                                    { $set: { status: applicationStatus.accepted } },
                                    { new: true },
                                )
                                return res.send(hired);
                            } else {
                                return res.status(400).json({
                                    error: "Validation Error",
                                    message: "Cannot change status of this application"
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