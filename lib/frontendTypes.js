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

export { userTypes, postTypes, salaryTypes, applicationStatus, branchTypes };