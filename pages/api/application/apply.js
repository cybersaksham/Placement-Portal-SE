import { StudentModel, ApplicationModel, PostingModel } from "../../../models";
import { applicationStatus, hiringTypes, modelTypes, userTypes } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import nextConnect from "next-connect";

export default nextConnect()
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { applicationId } = req.query;
            if (applicationId) {
                const application = await ApplicationModel.findById(applicationId);
                if (application) {
                    let data = await ApplicationModel.findById(applicationId)
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
                let post = await PostingModel.findById(posting);
                if (post && !post.isClosed) {
                    // Check for CGPA
                    if (post.minCGPA && post.minCGPA > student.cgpa) return res.status(400).json({
                        error: "Policy Error",
                        message: "You have not the minimum CGPA to apply"
                    });

                    // Checking for branch
                    if (post.branches && post.branches.length > 0
                        && post.branches.indexOf(student.branch) === -1) {
                        return res.status(400).json({
                            error: "Policy Error",
                            message: "Your branch is not allowed to apply"
                        });
                    }

                    // Checking if already applied
                    let applyData = await ApplicationModel.findOne({
                        posting, student: userId
                    })
                    if (applyData) return res.status(400).json({
                        error: "Duplication Error",
                        message: "You have already applied to this post"
                    });

                    // Checking if already placed
                    let placedData = await hiringTypes[post.type].findOne({ student: userId });
                    if (placedData) return res.status(400).json({
                        error: "Policy Error",
                        message: "You have already secured one place for this type of job"
                    });

                    // Creating a new Application
                    let application = await ApplicationModel.create({
                        posting, student: userId, resume, status: applicationStatus.applied,
                        type: post.type
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