import { useContext, useState } from "react";
import ApplicationContext from "../Context/Application/ApplicationContext";

const ApplyPostModal = ({ postId }) => {
    const { apply } = useContext(ApplicationContext);
    const [resume, setResume] = useState(null);

    return <div
        className="modal fade"
        id={`applyPostModal_${postId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby={`applyPostModal_${postId}Label`}
        aria-hidden="true"
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={`applyPostModal_${postId}Label`}>
                        <b>Apply to Post</b>
                    </h1>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                    <p><b>Submit your resume in order to apply to this post.</b></p>
                    <div className="input-group mb-3">
                        <input type="file" accept="application/pdf" className="form-control" id="inputGroupFile01" onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file || file.type !== "application/pdf") {
                                setResume(null);
                                return;
                            }
                            const reader = new FileReader();
                            var base64;
                            reader.readAsDataURL(file);
                            reader.onload = function (fileLoadedEvent) {
                                base64 = fileLoadedEvent.target.result;
                                setResume(base64);
                            };
                        }} />
                    </div>
                    <p>After submitting, company will be able to see your application. You won't be able to delete it once submitted.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" disabled={resume ? false : true}
                        onClick={() => {
                            apply({ posting: postId, resume });
                        }}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default ApplyPostModal;