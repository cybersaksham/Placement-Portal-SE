import { body, validationResult } from "express-validator";

export const companyValidator = [
    body("name", "Name must be 3 characters long.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be between 5 & 10 character.").isLength({
        min: 5,
        max: 10,
    }),
];