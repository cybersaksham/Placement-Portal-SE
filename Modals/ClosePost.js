import { useContext } from "react";
import PostingContext from "../Context/Posting/PostingContext";

const ClosePostModal = ({ postId }) => {
    const { closePosting } = useContext(PostingContext);

    return <div
        className="modal fade"
        id={`closePostModal_${postId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby={`closePostModal_${postId}Label`}
        aria-hidden="true"
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={`closePostModal_${postId}Label`}>
                        <b>Close Post</b>
                    </h1>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                    <p><b>Do you really want to close this post?</b></p>
                    <p>This action is irreversible. After closing the post students won't be able to apply to this posting and you won't be able to open it again.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                        onClick={() => {
                            closePosting({ postingId: postId });
                        }}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default ClosePostModal;