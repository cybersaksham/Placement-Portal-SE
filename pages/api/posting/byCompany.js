import { CompanyModel, InternPostModel, JobPostModel } from "../../../models";
import { connectToDB } from "../../../middlewares";
import nextConnect from "next-connect";

const destructure = (d1) => {
    let d2 = d1.posting;
    delete d1.posting;
    d1.salary = d1[salaryRepresentations[d2.type]] + " " + salaryTypes[d2.type];
    delete d1[salaryRepresentations[d2.type]];
    let d3 = { ...d2, details: { ...d1 } }
    return d3;
}

export default nextConnect()
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { companyId } = req.query;
            if (companyId) {
                const company = await CompanyModel.findById(companyId);
                if (company) {
                    // Finding Interns by company
                    let internData = await InternPostModel.find()
                        .populate({
                            path: "posting",
                            populate: { path: "company", select: "-password" }
                        }).lean();
                    internData = Array.from(internData).filter(el => el.posting.company._id == userId);
                    Array.from(internData).forEach((el, i) => {
                        internData[i] = destructure(el);
                    })

                    // Finding Jobs by company
                    let jobData = await JobPostModel.find()
                        .populate({
                            path: "posting",
                            populate: { path: "company", select: "-password" }
                        }).lean();
                    jobData = Array.from(jobData).filter(el => el.posting.company._id == userId);
                    Array.from(jobData).forEach((el, i) => {
                        jobData[i] = destructure(el);
                    })

                    return res.json({ interns: internData, jobs: jobData })
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