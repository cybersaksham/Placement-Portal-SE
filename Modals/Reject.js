import { useContext } from "react";
import HiringContext from "../Context/Hiring/HiringContext";

const RejectModal = ({ applicationId }) => {
    const { reject } = useContext(HiringContext);

    return <div
        className="modal fade"
        id={`rejectModal_${applicationId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby={`rejectModal_${applicationId}Label`}
        aria-hidden="true"
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={`rejectModal_${applicationId}Label`}>
                        <b>Reject candiate</b>
                    </h1>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                    <p><b>Are you sure you want to reject this candidate?</b></p>
                    <p>After hiring, you won't be able to change it. If you try to hire the student by any unethical means then you will be permanently banned by admin.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                        onClick={() => {
                            reject({ applicationId });
                        }}>
                        Reject
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default RejectModal;