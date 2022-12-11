import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../Context/Alert/AlertContext";
import { capitalize } from "../lib/utils";

const Alert = () => {
    const { alert } = useContext(AlertContext);
    const [alertType, setAlertType] = useState("");

    useEffect(() => {
        if (alert) {
            setAlertType(String(capitalize(alert.type)));
        }
    }, [alert])


    return (
        <div style={{ height: "50px" }}>
            {alert && (
                <div
                    className={`alert alert-${alert.type} alert-dismissible fade show`}
                    role="alert"
                >
                    <strong>
                        {alertType === "Danger"
                            ? alert.msg.split(":")[0]
                            : "Success"}
                    </strong>
                    {": "} {alertType === "Danger" ? alert.msg.split(":")[1] : alert.msg}
                </div>
            )}
        </div>
    );
};

export default Alert;