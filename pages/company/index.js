import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Loader from "../../Components/Loader";
import AuthContext from "../../Context/Auth/AuthContext";

const Company = () => {
    const { companies, getAllCompanies } = useContext(AuthContext);
    const [isloader, setIsloader] = useState(true);

    const fetchCompanies = async () => {
        setIsloader(true);
        await getAllCompanies();
        setIsloader(false);
    }

    useEffect(() => {
        fetchCompanies();
        //eslint-disable-next-line
    }, [])

    return isloader ? <Loader /> : companies && companies.length === 0 ? <center className='mt-3 fw-bold fs-3'>No companies found</center> : (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th>NAME</th>
                    <th>TYPE</th>
                    <th>EMAIL</th>
                    <th>HEADOFFICE</th>
                    <th>BANNED</th>
                </tr>
            </thead>
            <tbody>
                {companies.map((el, i) =>
                    <tr key={i}>
                        <td className="text-center">{i + 1}</td>
                        <td className="txt-oflo">
                            <Link href={"/user/" + el._id}>{el.name}</Link>
                        </td>
                        <td className="txt-oflo">
                            {el.type}
                        </td>
                        <td className="txt-oflo">
                            <a href={`mailto:${el.email}`} target="_blank" rel="noreferrer">{el.email}</a>
                        </td>
                        <td className="txt-oflo">
                            {el.headOffice}
                        </td>
                        <td className={`txt-oflo ${el.isBanned ? "text-danger" : ""}`}>
                            {el.isBanned ? "Yes" : "No"}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Company;