import { useRouter } from "next/router"
import { useContext, useEffect } from "react";
import { applicationStatus } from "../../lib/frontendTypes";
import { downloadPdf } from "../../lib/utils";
import ApplicationContext from "../../Context/Application/ApplicationContext";

const Application = () => {
    const { applications, getByPosting } = useContext(ApplicationContext);

    const router = useRouter();
    const posting = router.query.posting;

    useEffect(() => {
        if (posting) {
            getByPosting({ postingId: posting });
        }
    }, [posting])


    return applications && applications.length === 0 ? <center className='mt-3 fw-bold fs-3'>No application found</center> : (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th>SID</th>
                        <th>NAME</th>
                        <th>BRANCH</th>
                        <th>CGPA</th>
                        <th>STATUS</th>
                        <th>RESUME</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((el, i) =>
                        <tr key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td className="txt-oflo">
                                {el.student.sid}
                            </td>
                            <td>
                                <span className="text-oflo">
                                    {el.student.name}
                                </span>
                            </td>
                            <td className="txt-oflo">
                                {el.student.branch}
                            </td>
                            <td className="txt-oflo">
                                {el.student.cgpa}
                            </td>
                            <td className={`txt-oflo ${el.status === applicationStatus.accepted ? "text-success" : el.status === applicationStatus.rejected ? "text-danger" : ""}`}>
                                {el.status}
                            </td>
                            <td className="txt-oflo text-info">
                                <i className="bi bi-download pointer" onClick={() => {
                                    downloadPdf(el.resume, "Resume_" + el.student.sid + "_" + el._id + ".pdf");
                                }}></i>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Application