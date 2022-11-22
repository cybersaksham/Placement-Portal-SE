import { CompanyModel, StudentModel, AdminModel, InternPostModel, JobPostModel } from "../models";

const userTypes = {
    student: "Student",
    company: "Company",
    admin: "Admin"
};

const postTypes = {
    intern: "Intern",
    job: "Job"
}

const modelTypes = {
    [userTypes.student]: StudentModel,
    [userTypes.company]: CompanyModel,
    [userTypes.admin]: AdminModel,
    [postTypes.intern]: InternPostModel,
    [postTypes.job]: JobPostModel
};

export { userTypes, modelTypes, postTypes };