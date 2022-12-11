import React, { useContext, useRef, useState } from 'react'
import { postTypes, branchTypes, salaryTypes } from '../../lib/frontendTypes'
import PostingContext from '../../Context/Posting/PostingContext';

const CreatePost = () => {
    const roleRef = useRef(null);
    const [branchList, setBranchList] = useState([]);
    const minCGRef = useRef(null);
    const locationRef = useRef(null);
    const graduationYearRef = useRef(null);
    const joiningDateRef = useRef(null);
    // For Intern
    const stipendRef = useRef(null);
    const durationRef = useRef(null);
    // For Job
    const ctcRef = useRef(null);
    const sharesRef = useRef(null);

    const [postType, setPostType] = useState(postTypes.intern);
    const [isDisabled, setIsDisabled] = useState(false);

    const { postIntern, postJob } = useContext(PostingContext);

    const handlePostTypeChange = (e) => {
        setPostType(e.target.value);
    }

    const submitIntern = async () => {
        setIsDisabled(true);
        const role = roleRef.current.value;
        const branches = branchList;
        const minCGPA = minCGRef.current.value;
        const location = locationRef.current.value;
        const graduationYear = graduationYearRef.current.value;
        const joiningDate = joiningDateRef.current.value;
        const stipend = stipendRef.current.value;
        const duration = durationRef.current.value;
        await postIntern({
            role, branches,
            minCGPA, location, graduationYear, joiningDate,
            stipend, duration
        });
        setIsDisabled(false);
    }

    const submitJob = async () => {
        setIsDisabled(true);
        const role = roleRef.current.value;
        const branches = branchList;
        const minCGPA = minCGRef.current.value;
        const location = locationRef.current.value;
        const graduationYear = graduationYearRef.current.value;
        const joiningDate = joiningDateRef.current.value;
        const ctc = ctcRef.current.value;
        const shares = sharesRef.current.value;
        await postJob({
            role, branches,
            minCGPA, location, graduationYear, joiningDate,
            ctc, shares
        });
        setIsDisabled(false);
    }

    return (
        <div className="container mt-5">
            <fieldset disabled={isDisabled}>
                <div className="mb-3 row">
                    <label htmlFor="role" className="col-sm-2 col-form-label">
                        Role
                    </label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="role"
                            ref={roleRef}
                            placeholder="Role"
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="branches" className="col-sm-2 col-form-label">
                        Branches
                    </label>
                    <div className="dropdown col-sm-8">
                        <button
                            className="btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {branchList.length === 0 ? "Select" : branchList.join(", ")}
                        </button>
                        <ul className="dropdown-menu">
                            {branchTypes.map((el, i) =>
                                <li key={i}>
                                    <div className="m-2 form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue={el}
                                            id={el}
                                            checked={branchList.indexOf(el) !== -1}
                                            onChange={() => {
                                                let ind = branchList.indexOf(el);
                                                if (ind === -1) {
                                                    setBranchList([...branchList, el]);
                                                } else {
                                                    setBranchList([...branchList.slice(0, ind),
                                                    ...branchList.slice(ind + 1)]);
                                                }
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor={el}>
                                            {el}
                                        </label>
                                    </div>
                                </li>)}
                        </ul>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="mincgpa" className="col-sm-2 col-form-label">
                        MinCGPA
                    </label>
                    <div className="col-sm-8">
                        <input
                            type="number"
                            className="form-control"
                            id="mincgpa"
                            ref={minCGRef}
                            placeholder="Minimum CGPA"
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="location" className="col-sm-2 col-form-label">
                        Location
                    </label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="location"
                            ref={locationRef}
                            placeholder="Location"
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="gYear" className="col-sm-2 col-form-label">
                        Graduation Year
                    </label>
                    <div className="col-sm-8">
                        <input
                            type="number"
                            className="form-control"
                            id="gYear"
                            ref={graduationYearRef}
                            placeholder="Graduation Year"
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="jDate" className="col-sm-2 col-form-label">
                        Joining Date
                    </label>
                    <div className="col-sm-8">
                        <input
                            type="date"
                            className="form-control"
                            id="jDate"
                            ref={joiningDateRef}
                            placeholder="Joining Date"
                        />
                    </div>
                </div>
                {postType === postTypes.intern && <>
                    <div className="mb-3 row">
                        <label htmlFor="stipend" className="col-sm-2 col-form-label">
                            Stipend
                        </label>
                        <div className="col-sm-4">
                            <input
                                type="number"
                                className="form-control"
                                id="stipend"
                                placeholder={"Stipend (In " + salaryTypes[postTypes.intern] + ")"}
                                ref={stipendRef}
                            />
                        </div>
                        <label htmlFor="duration" className="col-sm-1 col-form-label">
                            Duration
                        </label>
                        <div className="col-sm-3">
                            <input
                                type="text"
                                className="form-control"
                                id="duration"
                                placeholder="Duration (eg: 2 mos)"
                                ref={durationRef}
                            />
                        </div>
                    </div>
                </>}
                {postType === postTypes.job && <>
                    <div className="mb-3 row">
                        <label htmlFor="ctc" className="col-sm-2 col-form-label">
                            CTC
                        </label>
                        <div className="col-sm-4">
                            <input
                                type="number"
                                className="form-control"
                                id="ctc"
                                placeholder={"CTC (In " + salaryTypes[postTypes.job] + ")"}
                                ref={ctcRef}
                            />
                        </div>
                        <label htmlFor="shares" className="col-sm-1 col-form-label">
                            Shares
                        </label>
                        <div className="col-sm-3">
                            <input
                                type="text"
                                className="form-control"
                                id="shares"
                                placeholder="Shares"
                                ref={sharesRef}
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
                                checked={postType === postTypes.intern}
                                defaultValue={postTypes.intern}
                                onChange={handlePostTypeChange}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">
                                Intern
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="authOptions"
                                id="inlineRadio2"
                                checked={postType === postTypes.job}
                                defaultValue={postTypes.job}
                                onChange={handlePostTypeChange}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">
                                Job
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <button
                            className="btn btn-primary"
                            type="button"
                            id="button-addon2"
                            onClick={postType === postTypes.intern ? submitIntern : submitJob}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

export default CreatePost;