import Link from "next/link";
import React, { useContext } from "react";
import AuthContext from "../Context/Auth/AuthContext";
import { applicationStatus } from "../lib/frontendTypes";
import { downloadPdf } from "../lib/utils";

const ApplicationTable = ({ applications }) => {
    const { currentUser } = useContext(AuthContext);

    return currentUser && applications.length === 0 ? <center className='mt-3 fw-bold fs-3'>No application found</center> : (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th>COMPANY</th>
                    <th>ROLE</th>
                    <th>TYPE</th>
                    <th>LOCATION</th>
                    <th>STATUS</th>
                    <th>RESUME</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((el, i) =>
                    <tr key={i}>
                        <td className="text-center">{i + 1}</td>
                        <td className="txt-oflo">
                            <Link href={"/user/" + el.company._id}>{el.company.name}</Link>
                        </td>
                        <td>
                            <span className="text-oflo">
                                {el.posting.role}
                            </span>
                        </td>
                        <td className="txt-oflo">
                            {el.type}
                        </td>
                        <td className="txt-oflo">
                            {el.posting.location}
                        </td>
                        <td className={`txt-oflo ${el.status === applicationStatus.accepted ? "text-success" : el.status === applicationStatus.rejected ? "text-danger" : ""}`}>
                            {el.status}
                        </td>
                        <td className="txt-oflo text-info">
                            <i className="bi bi-download pointer" onClick={() => {
                                downloadPdf(el.resume, "Resume_" + currentUser.sid + "_" + el._id + ".pdf");
                            }}></i>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default ApplicationTable