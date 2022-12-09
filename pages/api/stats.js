import { JobPostModel, PlacementModel, PostingModel, StudentModel } from "../../models";
import { connectToDB } from "../../middlewares";
import { branchTypes, modelTypes, postTypes, salaryRepresentations } from "../../lib/types";
import router from "../../lib/router";

export default router
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { year, type } = req.query;

            if (year && type) {
                let totalStudents = await StudentModel
                    .find({ graduationYear: year })
                    .select("sid branch").lean();
                let placedStudentsData = await PlacementModel.find()
                    .populate({ path: "student", select: "sid branch" })
                    .populate({ path: "posting", select: "graduationYear type" })
                    .find({ "posting.graduationYear": year, "posting.type": type })
                    .lean();

                let placedStudents = [];
                await Promise.all(placedStudentsData.map(async (el) => {
                    let posting = await modelTypes[type].findOne({ posting: el.posting._id })
                        .select(salaryRepresentations[type]).lean();
                    let data = {
                        sid: el.student.sid,
                        branch: el.student.branch,
                        stipend: posting[salaryRepresentations[type]]
                    }
                    placedStudents.push(data);
                }))

                let finalData = []
                branchTypes.forEach(branch => {
                    let branchStudents = totalStudents.filter(st => st.branch === branch);
                    if (branchStudents.length > 0) {
                        let branchPlaced = placedStudents.filter(st => st.branch === branch);
                        let highest = 0, total = 0;
                        branchPlaced.forEach(el => {
                            if (el.stipend > highest) highest = el.stipend;
                            total += el.stipend;
                        })
                        let average = branchPlaced.length > 0 ? Number(total / branchPlaced.length).toFixed(2) : 0;
                        let data = {
                            branch, totalStudents: branchStudents.length,
                            placedStudents: branchPlaced.length,
                            highest, average
                        }
                        data["placement"] = `${Number((data.placedStudents * 100) / data.totalStudents).toFixed(2)}%`;
                        finalData.push(data);
                    }
                })

                return res.json(finalData);
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Some arguments are missing"
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })