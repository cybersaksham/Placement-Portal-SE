import {
    CompanyModel, StudentModel, AdminModel, InternPostModel, JobPostModel,
    InternModel, PlacementModel
} from "../models";

const userTypes = {
    student: "Student",
    company: "Company",
    admin: "Admin"
};

const postTypes = {
    intern: "Intern",
    job: "Job"
}

const salaryTypes = {
    [postTypes.intern]: "KPM",
    [postTypes.job]: "LPA"
}

const salaryRepresentations = {
    [postTypes.intern]: "stipend",
    [postTypes.job]: "ctc"
}

const hiringTypes = {
    [postTypes.intern]: InternModel,
    [postTypes.job]: PlacementModel,
}

const modelTypes = {
    [userTypes.student]: StudentModel,
    [userTypes.company]: CompanyModel,
    [userTypes.admin]: AdminModel,
    [postTypes.intern]: InternPostModel,
    [postTypes.job]: JobPostModel
};

const applicationStatus = {
    applied: "Applied",
    accepted: "Accepted",
    rejected: "Rejected",
    closed: "Closed",
    expired: "Expired"
}

const branchTypes = [
    "CSE", "ECE", "EE", "ME", "CIVIL", "CHEM", "META"
]

export {
    userTypes, modelTypes, postTypes, hiringTypes, applicationStatus, branchTypes,
    salaryTypes, salaryRepresentations
};