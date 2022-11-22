import { PostingModel, JobPostModel, CompanyModel } from "../../../models";
import { userTypes } from "../../../lib/types";
import { connectToDB, initValidation, fetchUser } from "../../../middlewares";
import { postingValidator, jobPostValidator } from "../../../lib/validators";
import router from "../../../lib/router";

export default router
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { jobId } = req.query;
            if (jobId) {
                const job = await JobPostModel.findById(jobId);
                if (job) {
                    JobPostModel.findById(jobId)
                        .populate({
                            path: "posting",
                            populate: { path: "company", select: "-password" }
                        })
                        .exec((err, post) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Unknown Error",
                                    message: err.message
                                });
                            }
                            else {
                                return res.json(post);
                            }
                        });
                } else return res.status(400).json({
                    error: "Arguments Error",
                    message: "No job post found with given id"
                });
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Job Id not given"
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })
    .post(fetchUser, initValidation(postingValidator), initValidation(jobPostValidator),
        async (req, res) => {
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

                const { role, branches,
                    minCGPA, location, joiningDate,
                    ctc, shares } = req.body;

                // Creating a new Posting
                let posting = await PostingModel.create({
                    company: userId, role, branches,
                    minCGPA, location, joiningDate,
                });

                // Creating an Job Posting
                let jobPost = await JobPostModel.create({
                    posting: posting.id,
                    ctc, shares
                })

                JobPostModel.findById(jobPost.id)
                    .populate({
                        path: "posting",
                        populate: { path: "company", select: "-password" }
                    })
                    .exec((err, post) => {
                        if (err) {
                            return res.status(400).json({
                                error: "Unknown Error",
                                message: err.message
                            });
                        } else {
                            return res.json(post);
                        }
                    });
            }
            catch (e) {
                return res.status(500).json({
                    error: "Internal Server Error",
                    message: e.message
                });
            }
        }
    );