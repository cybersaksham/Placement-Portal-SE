import React, { useContext } from 'react'
import { userTypes } from "../lib/frontendTypes";
import { capitalize } from "../lib/utils";
import AuthContext from '../Context/Auth/AuthContext'

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

    return currentUser && <div className="card m-3">
        <div className="card-header d-flex justify-content-between align-items-center">
            <b>{currentUser.usertype !== userTypes.company && post.company.name + " - "}{post.role} {post.type}</b>
            <div>
                <button className="m-2 btn btn-sm btn-outline-primary">View</button>
                {post.isClosed && <button className="btn btn-sm btn-danger disable">Closed</button>}
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
            {Object.keys(post.details).map((el, i) => el.charAt(0) != "_" && <SingleRow key={i} field={capitalize(el)} value={post.details[el]} />)}
            <p className="card-text">
                <small className="text-muted">
                    <i className="bi bi-geo-alt-fill"></i>{" "}
                    {post.location}
                </small>
            </p>
        </div>
    </div>
}

export default PostingCard