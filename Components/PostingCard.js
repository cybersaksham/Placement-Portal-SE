import React, { useContext } from 'react'
import { userTypes } from "../lib/frontendTypes";
import { capitalize } from "../lib/utils";
import AuthContext from '../Context/Auth/AuthContext'
import ClosePostModal from '../Modals/ClosePost';
import ApplyPostModal from '../Modals/ApplyPost';
import Link from 'next/link';

const SingleRow = ({ field, value }) => {
    return <div className="mb-3 row">
        <div className="col-sm-2">
            <b>{field}:</b>
        </div>
        <div className="col-sm-8">
            {value}
        </div>
    </div>
}

const PostingCard = ({ post }) => {
    const { currentUser } = useContext(AuthContext);

    return currentUser && <>
        <ApplyPostModal postId={post._id} />
        <ClosePostModal postId={post._id} />
        <div className="card m-3">
            <div className="card-header d-flex justify-content-between align-items-center">
                <b>{currentUser.usertype !== userTypes.company && post.company.name + " - "}{post.role} {post.type}</b>{" "}
                <div className="dropdown m-2">
                    <button className="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Actions
                    </button>
                    <ul className="dropdown-menu">
                        {currentUser.usertype === userTypes.student && <li><span className={`dropdown-item ${post.isApplied ? "text-muted" : "pointer"}`} data-bs-toggle={post.isApplied ? "" : "modal"} data-bs-target={post.isApplied ? "" : `#applyPostModal_${post._id}`}>Apply</span></li>}
                        <li><Link href={"/user/" + post.company._id}><span className="dropdown-item pointer">View Company</span></Link></li>
                        {currentUser.usertype === userTypes.company && <li><Link href={`/application/${post._id}`}><span className="dropdown-item pointer">View Applications</span></Link></li>}
                        {currentUser.usertype === userTypes.company && <li><span className={`dropdown-item text-danger ${post.isClosed ? "text-muted" : "pointer"}`} data-bs-toggle={post.isClosed ? "" : "modal"} data-bs-target={post.isClosed ? "" : `#closePostModal_${post._id}`}>Close Post</span></li>}
                    </ul>
                </div>
            </div>
            <div className="card-body">
                {currentUser.usertype !== userTypes.company && <>
                    <SingleRow field="Company" value={post.company.name} />
                </>}
                <SingleRow field="Role" value={post.role} />
                <SingleRow field="Branches" value={post.branches.join(", ")} />
                <SingleRow field="Graduation Year" value={post.graduationYear} />
                <SingleRow field="Type" value={post.type} />
                {post.minCGPA && <SingleRow field="MinCGPA" value={post.minCGPA} />}
                {post.joiningDate && <SingleRow field="Joining Date" value={post.joiningDate.substring(0, 10)} />}
                {Object.keys(post.details).map((el, i) => el.charAt(0) != "_" && <SingleRow key={i} field={capitalize(el)} value={post.details[el]} />)}
                <p className="card-text d-flex justify-content-between">
                    <small className="text-muted">
                        <i className="bi bi-geo-alt-fill"></i>{" "}
                        {post.location}
                    </small>
                    <span>
                        {currentUser.usertype === userTypes.student && post.isApplied && <span className="text-success"><i className="bi bi-check2"></i>Applied</span>}{" "}
                        {post.isClosed && <span className="text-danger"><i className="bi bi-x"></i>Closed</span>}
                    </span>
                </p>
            </div>
        </div>
    </>
}

export default PostingCard