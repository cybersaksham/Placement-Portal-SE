import { PostingModel, InternPostModel, CompanyModel } from "../../models";
import { userTypes } from "../../lib/types";
import { connectToDB, initValidation, fetchUser } from "../../middlewares";
import { postingValidator, internPostValidator } from "../../lib/validators";
import router from "../../lib/router";

export default router
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { internId } = req.query;
            if (internId) {
                const intern = await InternPostModel.findById(internId);
                if (intern) {
                    InternPostModel.findById(internId)
                        .populate("posting")
                        .exec((err, post) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Unknown Error",
                                    message: e.message
                                });
                            }
                            else {
                                return res.json(post);
                            }
                        });
                } else return res.status(400).json({
                    error: "Arguments Error",
                    message: "No intern post found with given id"
                });
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Intern Id not given"
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })
    .post(fetchUser, initValidation(postingValidator), initValidation(internPostValidator),
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

                const { role, branches,
                    minCGPA, location, joiningDate,
                    stipend, duration } = req.body;

                // Creating a new Posting
                let posting = await PostingModel.create({
                    company: userId, role, branches,
                    minCGPA, location, joiningDate,
                });

                // Creating an Intern Posting
                let internPost = await InternPostModel.create({
                    posting: posting.id,
                    stipend, duration
                })

                InternPostModel.findById(internPost.id)
                    .populate("posting")
                    .exec((err, post) => {
                        if (err) {
                            return res.status(400).json({
                                error: "Unknown Error",
                                message: e.message
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