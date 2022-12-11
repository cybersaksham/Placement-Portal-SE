import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import Avatar from 'react-avatar';
import AuthContext from '../Context/Auth/AuthContext';
import { userTypes } from "../lib/frontendTypes";

const Navbar = () => {
    const { currentUser, logoutUser } = useContext(AuthContext);
    const router = useRouter();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    Placement Portal
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${router.pathname === "/" ? "active" : ""}`} aria-current="page" href="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${router.pathname.startsWith("/posting") ? "active" : ""}`} aria-current="page" href="/posting">
                                Postings
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${router.pathname.startsWith("/company") ? "active" : ""}`} aria-current="page" href="/company">
                                Companies
                            </Link>
                        </li>
                        {currentUser && currentUser.usertype === userTypes.student && <li className="nav-item">
                            <Link className={`nav-link ${router.pathname.startsWith("/application") ? "active" : ""}`} aria-current="page" href="/application">
                                Applications
                            </Link>
                        </li>}
                        <li className="nav-item">
                            {
                                currentUser ?
                                    <span className={`nav-link ${router.pathname.startsWith("/auth") ? "active" : ""}`} style={{ cursor: "pointer" }}
                                        onClick={logoutUser}>Logout</span>
                                    : <Link className={`nav-link ${router.pathname.startsWith("/auth") ? "active" : ""}`} href="/auth/login">Login</Link>
                            }
                        </li>
                    </ul>
                    {currentUser && <Link href={"/user/" + currentUser._id}><Avatar name={currentUser.name} size={35} round="20px" /></Link>}
                </div>
            </div>
        </nav>

    )
}

export default Navbar