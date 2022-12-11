import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import Avatar from "react-avatar";
import AuthContext from "../../Context/Auth/AuthContext";
import AdminContext from "../../Context/Admin/AdminContext";
import Loader from "../../Components/Loader";
import { capitalize } from "../../lib/utils";
import { userTypes } from "../../lib/frontendTypes";

const User = () => {
    const { currentUser, fetchedUser, getByID } = useContext(AuthContext);
    const { ban, unban } = useContext(AdminContext);
    const [isloader, setIsloader] = useState(true);

    const router = useRouter();
    const { userId } = router.query;

    const findUser = async () => {
        setIsloader(true);
        await getByID({ userId });
        setIsloader(false);
    }

    useEffect(() => {
        if (userId) {
            findUser();
        }
        //eslint-disable-next-line
    }, [userId])


    return isloader ? <Loader /> : fetchedUser && (
        <section className="bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <div className="card card-style1 border-0">
                            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 mb-4 mb-lg-0">
                                        <Avatar name={fetchedUser.name} size={300} round="500px" />
                                    </div>
                                    <div className="col-lg-6 px-xl-10">
                                        {fetchedUser.isBanned && <div className="d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                            <h3 className="h2 mb-0 text-danger">Banned</h3>
                                        </div>}
                                        <ul className="list-unstyled mb-1-9">
                                            {Object.keys(fetchedUser).map((el, i) => el.charAt(0) !== '_' && el !== "isBanned" && <li className="mb-2 mb-xl-3 display-28" key={i} >
                                                <span className="display-26 text-secondary me-2 font-weight-600">
                                                    {capitalize(el)}:
                                                </span>{" "}
                                                {el === "dob" ? fetchedUser[el].substring(0, 10).toString() : fetchedUser[el].toString()}
                                            </li>)}
                                        </ul>
                                        {currentUser && currentUser.usertype === userTypes.admin && fetchedUser.usertype !== userTypes.admin && (!fetchedUser.isBanned ? <button className="btn btn-outline-danger" onClick={() => {
                                            ban({ id: userId, type: fetchedUser.usertype })
                                        }}>Ban User</button> : <button className="btn btn-outline-success" onClick={() => {
                                            unban({ id: userId, type: fetchedUser.usertype })
                                        }}>UnBan User</button>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default User