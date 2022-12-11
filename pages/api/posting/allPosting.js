import { userTypes, salaryRepresentations, salaryTypes } from "../../../lib/types";
import { connectToDB, fetchUser } from "../../../middlewares";
import nextConnect from "next-connect";
import { AdminModel, ApplicationModel, CompanyModel, InternPostModel, JobPostModel, StudentModel } from "../../../models";

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
    .get(fetchUser, async (req, res) => {
        try {
            // Finding User
            const userId = req.user.id;
            const usertype = req.user.type;

            if (usertype === userTypes.student) {
                let student = await StudentModel.findById(userId);
                if (!student) {
                    return res.status(401).json({
                        error: "Authentication Error",
                        message: "Try to logout and login again"
                    });
                }

                // Fetching Applications
                let applications = await ApplicationModel.find({ student: userId })
                    .select("posting").lean();
                let applicationIds = [];
                applications.forEach(el => applicationIds.push(String(el.posting)));

                // Finding Interns by graduation year
                let internData = await InternPostModel.find()
                    .populate({
                        path: "posting",
                        populate: { path: "company", select: "-password" }
                    }).lean();
                internData = Array.from(internData).filter(el => {
                    if (el.posting.graduationYear == student.graduationYear) {
                        if (el.posting.branches.length === 0) return !el.posting.isClosed;
                        else return el.posting.branches.indexOf(student.branch) >= 0 && !el.posting.isClosed;
                    }
                });
                Array.from(internData).forEach((el, i) => {
                    internData[i] = destructure(el);
                    if (applicationIds.indexOf(String(internData[i]._id)) !== -1) {
                        internData[i].isApplied = true;
                    } else internData[i].isApplied = false;
                })

                // Finding Jobs by graduation year
                let jobData = await JobPostModel.find()
                    .populate({
                        path: "posting",
                        populate: { path: "company", select: "-password" }
                    }).lean();
                jobData = Array.from(jobData).filter(el => {
                    if (el.posting.graduationYear == student.graduationYear) {
                        if (el.posting.branches.length === 0) return !el.posting.isClosed;
                        else return el.posting.branches.indexOf(student.branch) >= 0 && !el.posting.isClosed;
                    }
                });
                Array.from(jobData).forEach((el, i) => {
                    jobData[i] = destructure(el);
                    if (applicationIds.indexOf(String(jobData[i]._id)) !== -1) {
                        jobData[i].isApplied = true;
                    } else jobData[i].isApplied = false;
                })

                return res.json({ interns: internData, jobs: jobData })
            } else if (usertype === userTypes.company) {
                let company = await CompanyModel.findById(userId);
                if (!company) {
                    return res.status(401).json({
                        error: "Authentication Error",
                        message: "Try to logout and login again"
                    });
                }

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
            } else if (usertype === userTypes.admin) {
                let admin = await AdminModel.findById(userId);
                if (!admin) {
                    return res.status(401).json({
                        error: "Authentication Error",
                        message: "Try to logout and login again"
                    });
                }

                // Finding Interns
                let internData = await InternPostModel.find()
                    .populate({
                        path: "posting",
                        populate: { path: "company", select: "-password" }
                    }).lean();
                internData = Array.from(internData).filter(el => !el.posting.isClosed);
                Array.from(internData).forEach((el, i) => {
                    internData[i] = destructure(el);
                })

                // Finding Jobs
                let jobData = await JobPostModel.find()
                    .populate({
                        path: "posting",
                        populate: { path: "company", select: "-password" }
                    }).lean();
                jobData = Array.from(jobData).filter(el => !el.posting.isClosed);
                Array.from(jobData).forEach((el, i) => {
                    jobData[i] = destructure(el);
                })

                return res.json({ interns: internData, jobs: jobData })
            } else {
                return res.status(401).json({
                    error: "Authentication Error",
                    message: "Try to logout and login again"
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })