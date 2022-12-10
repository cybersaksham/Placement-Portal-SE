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
                    let posts = await modelTypes[type].find()
                        .populate({
                            path: "posting",
                            populate: { path: "company", select: "-password" }
                        }).lean();
                    let data = Array.from(posts).filter(
                        el => el.posting.company._id == companyId
                    );
                    data.company = data.posting.company;
                    delete data.posting.company;
                    return res.json(data);
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