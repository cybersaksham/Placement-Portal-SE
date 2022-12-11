import React, { useContext, useRef, useState } from 'react'
import Link from 'next/link';
import { userTypes } from '../../lib/frontendTypes'
import AuthContext from '../../Context/Auth/AuthContext';

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [authType, setAuthType] = useState(userTypes.company);
    const [showPassword, setShowPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const { loginUser } = useContext(AuthContext);

    const handleAuthTypeChange = (e) => {
        setAuthType(e.target.value);
    }

    const submitForm = async () => {
        setIsDisabled(true);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await loginUser({ email, password, type: authType });
        setIsDisabled(false);
    }

    return (
        <div className="container mt-5">
            <fieldset disabled={isDisabled}>
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
                    <div className="col-sm-8">
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            className="form-control"
                            id="inputPassword"
                            ref={passwordRef}
                            aria-describedby="button-addon2"
                            placeholder="Password"
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
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="authOptions"
                                id="inlineRadio2"
                                checked={authType === userTypes.admin}
                                defaultValue={userTypes.admin}
                                onChange={handleAuthTypeChange}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">
                                Admin
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <button
                            className="btn btn-primary"
                            type="button"
                            id="button-addon2"
                            onClick={submitForm}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <p>Don&apos;t have an account? <Link href="/auth/register">Register</Link></p>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

export default Login