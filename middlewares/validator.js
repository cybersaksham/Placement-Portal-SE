import { validationResult } from "express-validator";

const initValidation = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();
        return res.status(400).json({
            error: "Validation Error",
            message: errors.array()[0].msg
        });
    }
}

export default initValidation;