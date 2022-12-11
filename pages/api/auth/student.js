import { StudentModel } from "../../../models";
import { userTypes } from "../../../lib/types";
import { connectToDB, initValidation } from "../../../middlewares";
import { studentValidator } from "../../../lib/validators";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nextConnect from "next-connect";

const JWT_SECRET = process.env.JWT_SECRET || "NOT_SO_SECRET";

export default nextConnect()
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { sid } = req.query;
            if (sid) {
                const student = await StudentModel.find({ sid: String(sid).toUpperCase() }).select("-password");
                if (student) return res.json(student);
                else return res.status(400).json({
                    error: "Arguments Error",
                    message: "No student found with given id"
                });
            } else {
                return res.status(400).json({
                    error: "Arguments Error",
                    message: "Student Id not given"
                });
            }
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })
    .post(initValidation(studentValidator), async (req, res) => {
        try {
            const { name, sid, password,
                degree, branch, graduationYear,
                dob, skills, cgpa
            } = req.body;

            // Getting student if already exists
            let student = await StudentModel.findOne({ sid });
            if (student) {
                res.status(400).json({
                    error: "Validation Error",
                    message: "Student already exists with this id",
                })
            }

            // Hashing Password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            // Creating a new Student
            student = await StudentModel.create({
                name,
                sid: String(sid).toUpperCase(),
                password: secPass,
                degree, branch, graduationYear,
                dob, skills, cgpa
            });

            // Generating Token
            const data = {
                user: { id: student.id, type: userTypes.student },
            };
            const authToken = jwt.sign(data, JWT_SECRET);

            return res.json({ authToken });
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    });