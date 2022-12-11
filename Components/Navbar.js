import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import AuthContext from '../Context/Auth/AuthContext';

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
                            {
                                currentUser ?
                                    <span className={`nav-link ${router.pathname.startsWith("/auth") ? "active" : ""}`} style={{ cursor: "pointer" }}
                                        onClick={logoutUser}>Logout</span>
                                    : <Link className={`nav-link ${router.pathname.startsWith("/auth") ? "active" : ""}`} href="/auth/login">Login</Link>
                            }
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>

    )
}

export default Navbar