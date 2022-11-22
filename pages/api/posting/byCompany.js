import { CompanyModel } from "../../../models";
import { modelTypes } from "../../../lib/types";
import { connectToDB } from "../../../middlewares";
import router from "../../../lib/router";

export default router
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { companyId, type } = req.query;
            if (companyId) {
                const company = await CompanyModel.findById(companyId);
                if (company) {
                    modelTypes[type].find()
                        .populate({
                            path: "posting",
                            populate: { path: "company", select: "-password" }
                        })
                        .exec((err, posts) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Unknown Error",
                                    message: err.message
                                });
                            }
                            else {
                                let newPosts = Array.from(posts).filter(
                                    el => el.posting.company.id == companyId
                                );
                                return res.send(newPosts);
                            }
                        });
                } else return res.status(400).json({
                    error: "Arguments Error",
                    message: "No company found with given id"
                });
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Company Id not given"
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })