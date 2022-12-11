import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import Loader from "../../Components/Loader";
import PostingCard from '../../Components/PostingCard';
import PostingContext from "../../Context/Posting/PostingContext";

const Postings = () => {
    const { postings, getAll } = useContext(PostingContext);
    const [isLoader, setIsLoader] = useState(true);

    const fetchPostings = async () => {
        setIsLoader(true);
        await getAll();
        setIsLoader(false);
    }

    useEffect(() => {
        fetchPostings();
        //eslint-disable-next-line
    }, [])

    return isLoader ? <Loader /> : postings && postings.jobs && postings.interns && (
        <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="job-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#job-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="job-tab-pane"
                        aria-selected="true"
                    >
                        Jobs
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="intern-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#intern-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="intern-tab-pane"
                        aria-selected="false"
                    >
                        Intern
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div
                    className="tab-pane fade show active"
                    id="job-tab-pane"
                    role="tabpanel"
                    aria-labelledby="job-tab"
                    tabIndex={0}
                >
                    {postings.jobs.length === 0 ? <center className='mt-3 fw-bold fs-3'>No job found</center> : postings.jobs.map((el, i) => <PostingCard key={i} post={el} />)}
                </div>
                <div
                    className="tab-pane fade"
                    id="intern-tab-pane"
                    role="tabpanel"
                    aria-labelledby="intern-tab"
                    tabIndex={1}
                >
                    {postings.interns.length === 0 ? <center className='mt-3 fw-bold fs-3'>No intern found</center> : postings.interns.map((el, i) => <PostingCard key={i} post={el} />)}
                </div>
            </div>
            <Link className="add-btn" href="/posting/create">
                <i className="bi bi-plus-lg"></i>
            </Link>
        </>
    )
}

export default Postings