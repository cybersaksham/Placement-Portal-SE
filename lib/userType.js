import { CompanyModel, StudentModel, AdminModel } from "../models";

const userTypes = {
    student: "Student",
    company: "Company",
    admin: "Admin"
};

const modelTypes = {
    [userTypes.student]: StudentModel,
    [userTypes.company]: CompanyModel,
    [userTypes.admin]: AdminModel,
};

export { userTypes, modelTypes };