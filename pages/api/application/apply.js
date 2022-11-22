import { StudentModel, ApplicationModel, PostingModel } from "../../../models";
import { userTypes } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import router from "../../../lib/router";

export default router
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { applicationId } = req.query;
            if (applicationId) {
                const application = await ApplicationModel.findById(applicationId);
                if (application) {
                    ApplicationModel.findById(applicationId)
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
                            else {
                                return res.json(data);
                            }
                        });
                } else return res.status(400).json({
                    error: "Arguments Error",
                    message: "No application found with given id"
                });
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Application Id not given"
                });
            }
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

            if (type !== userTypes.student) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "You are not logged in as an student"
                })
            }

            let student = await StudentModel.findById(userId).select("-password");
            if (!student) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "You are not logged in as an student"
                });
            }
            if (student.isBanned) {
                return res.status(400).json({
                    error: "Authentication Error",
                    message: "You are currently banned by admin"
                });
            }

            const { posting, resume } = req.body;

            if (posting) {
                let applyData = await ApplicationModel.findOne({
                    posting, student: userId
                })
                if (applyData) return res.status(400).json({
                    error: "Duplication Error",
                    message: "You have already applied to this post"
                });

                let post = await PostingModel.findById(posting);
                if (post && !post.isClosed) {
                    // Creating a new Application
                    let application = await ApplicationModel.create({
                        posting, student: userId, resume
                    });

                    return res.json(application);
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