import { useContext } from "react";
import HiringContext from "../Context/Hiring/HiringContext";

const AcceptModal = ({ applicationId }) => {
    const { accept } = useContext(HiringContext);

    return <div
        className="modal fade"
        id={`acceptModal_${applicationId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby={`acceptModal_${applicationId}Label`}
        aria-hidden="true"
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={`acceptModal_${applicationId}Label`}>
                        <b>Hire candiate</b>
                    </h1>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                    <p><b>Are you sure you want to hire this candidate?</b></p>
                    <p>After hiring, you won't be able to change it. If you try to reject the student by any unethical means then you will be permanently banned by admin.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                        onClick={() => {
                            accept({ applicationId });
                        }}>
                        Hire
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default AcceptModal;