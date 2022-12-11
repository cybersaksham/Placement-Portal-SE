import React, { useContext, useRef, useState } from 'react'
import Link from 'next/link';
import { branchTypes, userTypes } from '../../lib/frontendTypes'
import AuthContext from '../../Context/Auth/AuthContext';

const Register = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const cPasswordRef = useRef(null);
    // For Company
    const typeRef = useRef(null);
    const headOfficeRef = useRef(null);
    // For Student
    const degreeRef = useRef(null);
    const branchRef = useRef(null);
    const graduationYearRef = useRef(null);
    const dobRef = useRef(null);
    const skillsRef = useRef(null);
    const cgpaRef = useRef(null);

    const [authType, setAuthType] = useState(userTypes.company);
    const [showPassword, setShowPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const { registerCompany, registerStudent } = useContext(AuthContext);

    const handleAuthTypeChange = (e) => {
        setAuthType(e.target.value);
    }

    const submitCompany = async () => {
        setIsDisabled(true);
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const cPassword = cPasswordRef.current.value;
        const type = typeRef.current.value;
        const headOffice = headOfficeRef.current.value;
        await registerCompany({ name, email, password, cPassword, type, headOffice });
        setIsDisabled(false);
    }

    const submitStudent = async () => {
        setIsDisabled(true);
        const name = nameRef.current.value;
        const sid = emailRef.current.value;
        const password = passwordRef.current.value;
        const cPassword = cPasswordRef.current.value;
        const degree = degreeRef.current.value;
        const branch = branchRef.current.value;
        const graduationYear = graduationYearRef.current.value;
        const dob = dobRef.current.value;
        const skills = skillsRef.current.value.split(" ");
        const cgpa = cgpaRef.current.value;
        await registerStudent({
            name, sid, password, cPassword, degree, branch,
            graduationYear, dob, skills, cgpa
        });
        setIsDisabled(false);
    }

    return (
        <div className="container mt-5">
            <fieldset disabled={isDisabled}>
                <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">
                        Name
                    </label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            ref={nameRef}
                            placeholder="Name"
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                        ID
                    </label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            ref={emailRef}
                            placeholder={authType === userTypes.student ? "College ID" : "Email ID"}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-4">
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            className="form-control"
                            id="inputPassword"
                            ref={passwordRef}
                            aria-describedby="button-addon2"
                            placeholder="Password"
                        />
                    </div>
                    <label htmlFor="confirmPassword" className="col-sm-1 col-form-label">
                        Confirm
                    </label>
                    <div className="col-sm-3">
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            className="form-control"
                            id="confirmPassword"
                            ref={cPasswordRef}
                            aria-describedby="button-addon2"
                            placeholder="Re-enter Password"
                        />
                    </div>
                    <div className="col-sm-2">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={() => { setShowPassword(!showPassword) }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                {authType === userTypes.company && <>
                    <div className="mb-3 row">
                        <label htmlFor="type" className="col-sm-2 col-form-label">
                            Type
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                placeholder="Type of company"
                                ref={typeRef}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="headOffice" className="col-sm-2 col-form-label">
                            Head Office
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                id="headOffice"
                                placeholder="Head-Office location"
                                ref={headOfficeRef}
                            />
                        </div>
                    </div>
                </>}
                {authType === userTypes.student && <>
                    <div className="mb-3 row">
                        <label htmlFor="branch" className="col-sm-2 col-form-label">
                            Branch
                        </label>
                        <div className="col-sm-4">
                            <div className="input-group">
                                <select className="form-select" id="inputGroupSelect02" ref={branchRef}>
                                    {branchTypes.map((el, i) => <option key={i + 1} value={el}>{el}</option>)}
                                </select>
                            </div>
                        </div>
                        <label htmlFor="degree" className="col-sm-1 col-form-label">
                            Degree
                        </label>
                        <div className="col-sm-3">
                            <input
                                type="text"
                                className="form-control"
                                id="degree"
                                placeholder="Degree"
                                ref={degreeRef}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="admYear" className="col-sm-2 col-form-label">
                            Graduation Year
                        </label>
                        <div className="col-sm-4">
                            <input
                                type="number"
                                className="form-control"
                                id="admYear"
                                placeholder="Graduation Year"
                                ref={graduationYearRef}
                            />
                        </div>
                        <label htmlFor="dob" className="col-sm-1 col-form-label">
                            DOB
                        </label>
                        <div className="col-sm-3">
                            <input
                                type="date"
                                className="form-control"
                                id="dob"
                                ref={dobRef}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="skills" className="col-sm-2 col-form-label">
                            Skills
                        </label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                id="skills"
                                placeholder="Skills (seperated by spaces)"
                                ref={skillsRef}
                            />
                        </div>
                        <label htmlFor="cgpa" className="col-sm-1 col-form-label">
                            CGPA
                        </label>
                        <div className="col-sm-3">
                            <input
                                type="number"
                                className="form-control"
                                id="cgpa"
                                placeholder="Current CGPA"
                                ref={cgpaRef}
                            />
                        </div>
                    </div>
                </>}
                <div className="mb-3 row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8 d-flex align-items-center">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="authOptions"
                                id="inlineRadio1"
                                checked={authType === userTypes.company}
                                defaultValue={userTypes.company}
                                onChange={handleAuthTypeChange}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">
                                Company
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="authOptions"
                                id="inlineRadio2"
                                checked={authType === userTypes.student}
                                defaultValue={userTypes.student}
                                onChange={handleAuthTypeChange}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">
                                Student
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <button
                            className="btn btn-primary"
                            type="button"
                            id="button-addon2"
                            onClick={authType === userTypes.student ? submitStudent : submitCompany}
                        >
                            Register
                        </button>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <p>Already have an account? <Link href="/auth/login">Login</Link></p>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

export default Register