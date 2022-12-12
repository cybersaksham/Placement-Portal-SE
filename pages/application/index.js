import { useContext, useEffect, useState } from "react";
import { postTypes } from "../../lib/frontendTypes";
import ApplicationContext from "../../Context/Application/ApplicationContext";
import Loader from "../../Components/Loader";
import AuthContext from "../../Context/Auth/AuthContext";
import ApplicationTable from "../../Components/ApplicationTable";

const Application = () => {
    const { currentUser } = useContext(AuthContext);
    const { applications, getByStudent } = useContext(ApplicationContext);
    const [isloader, setIsloader] = useState(true);
    const [internApplication, setInternApplication] = useState([]);
    const [jobApplications, setJobApplications] = useState([]);

    const fetchApplications = async () => {
        setIsloader(true);
        await getByStudent();
        setIsloader(false);
    }

    useEffect(() => {
        if (currentUser) {
            fetchApplications();
        }
        //eslint-disable-next-line
    }, [currentUser])

    useEffect(() => {
        setInternApplication(applications.filter(el => el.type === postTypes.intern))
        setJobApplications(applications.filter(el => el.type === postTypes.job))
    }, [applications])


    return isloader ? <Loader /> : currentUser && (
        <div>
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
                    <ApplicationTable applications={jobApplications} />
                </div>
                <div
                    className="tab-pane fade"
                    id="intern-tab-pane"
                    role="tabpanel"
                    aria-labelledby="intern-tab"
                    tabIndex={1}
                >
                    <ApplicationTable applications={internApplication} />
                </div>
            </div>
        </div>
    )
}

export default Application