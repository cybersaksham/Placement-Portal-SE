import { body, validationResult } from "express-validator";

export const companyValidator = [
    body("name", "Name must be 3 characters long.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be between 5 & 10 character.").isLength({
        min: 5,
        max: 10,
    }),
];

export const studentValidator = [
    body("name", "Name must be 3 characters long.").isLength({ min: 3 }),
    body("sid", "Enter a valid student id.").isLength({ min: 11, max: 11 }),
    body("password", "Password must be between 5 & 10 character.").isLength({
        min: 5,
        max: 10,
    }),
    body("degree", "Degree should be provided.").isLength({ min: 1 }),
    body("branch", "Branch should be provided.").isLength({ min: 1 }),
    body("graduationYear", "Graduation year is incorrect.").isLength({ min: 4, max: 4 }),
    body("dob", "DOB should be provided.").isLength({ min: 1 }),
    body("skills", "Skills should be an array of strings.").isArray(),
    body("cgpa", "CGPA should be provided.").isLength({ min: 1 })
];

export const postingValidator = [
    body("role", "Posting role is important").isLength({ min: 1 }),
    body("graduationYear", "Graduation Year is important").isLength({ min: 4, max: 4 })
];

export const internPostValidator = [
    body("stipend", "Stipend is required").isLength({ min: 1 }),
    body("duration", "Duration is important").isLength({ min: 1 }),
];

export const jobPostValidator = [
    body("ctc", "CTC is required").isLength({ min: 1 }),
];