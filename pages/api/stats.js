import { StudentModel } from "../../models";
import { connectToDB } from "../../middlewares";
import { branchTypes, hiringTypes, modelTypes, salaryTypes, salaryRepresentations } from "../../lib/types";
import nextConnect from "next-connect";

export default nextConnect()
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            let { year, type } = req.query;

            if (year && type) {
                year = Number(year);
                let totalStudents = await StudentModel
                    .find({ graduationYear: year })
                    .select("sid branch").lean();
                let placedStudentsData = await hiringTypes[type].find()
                    .populate({ path: "student", select: "sid branch" })
                    .populate({ path: "posting", select: "graduationYear type" })
                    .lean();
                placedStudentsData = placedStudentsData.filter(el => {
                    return el.posting.graduationYear == year
                        && el.posting.type == type;
                })

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
                let finTotal = 0;
                branchTypes.forEach(branch => {
                    let branchStudents = totalStudents.filter(st => st.branch === branch);
                    if (branchStudents.length > 0) {
                        let branchPlaced = placedStudents.filter(st => st.branch === branch);
                        let highest = 0, total = 0;
                        branchPlaced.forEach(el => {
                            if (Number(el.stipend) > highest) highest = Number(el.stipend);
                            total += Number(el.stipend);
                        })
                        finTotal += total;
                        let average = branchPlaced.length > 0 ? Number(total / branchPlaced.length).toFixed(2) : 0;
                        let data = {
                            branch, totalStudents: branchStudents.length,
                            placedStudents: branchPlaced.length,
                            highest: String(highest) + " " + salaryTypes[type],
                            average: String(average) + " " + salaryTypes[type],
                        }
                        data["placement"] = `${Number((data.placedStudents * 100) / data.totalStudents).toFixed(2)}%`;
                        finalData.push(data);
                    }
                })

                // Calculating total
                let finTotalStudents = 0, finPlacedStudents = 0;
                let finHighest = 0;
                finalData.forEach(el => {
                    finTotalStudents += el.totalStudents;
                    finPlacedStudents += el.placedStudents;
                    let curHigh = Number(el.highest.split(" ")[0]);
                    if (curHigh > finHighest) finHighest = curHigh;
                })
                let finAverage = finPlacedStudents > 0 ? Number(finTotal / finPlacedStudents).toFixed(2) : 0;
                let totalData = {
                    branch: "TOTAL", totalStudents: finTotalStudents,
                    placedStudents: finPlacedStudents,
                    placement: finTotalStudents > 0 ? `${Number((finPlacedStudents * 100) / finTotalStudents).toFixed(2)}%` : "-",
                    highest: String(finHighest) + " " + salaryTypes[type],
                    average: String(finAverage) + " " + salaryTypes[type],
                }
                finalData.push(totalData);

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