import { CompanyModel } from "../../../models";
import { userTypes } from "../../../lib/types";
import { connectToDB, initValidation } from "../../../middlewares";
import { companyValidator } from "../../../lib/validators";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nextConnect from "next-connect";

const JWT_SECRET = process.env.JWT_SECRET || "NOT_SO_SECRET";

export default nextConnect()
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { companyId } = req.query;
            if (companyId) {
                const company = await CompanyModel.findById(companyId).select("-password");
                if (company) return res.json(company);
                else return res.status(400).json({
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
    .post(initValidation(companyValidator), async (req, res) => {
        try {
            const { name, email, password, type, headOffice } = req.body;

            // Getting company if already exists
            let company = await CompanyModel.findOne({ email });
            if (company) {
                res.status(400).json({
                    error: "Validation Error",
                    message: "Company already exists with this email id",
                })
            }

            // Hashing Password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            // Creating a new Company
            company = await CompanyModel.create({
                name,
                email,
                password: secPass,
                type,
                headOffice
            });

            // Generating Token
            const data = {
                user: { id: company.id, type: userTypes.company },
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