import React from 'react'
import { IoCloseOutline } from "react-icons/io5";

const DeleteAccordion = (props) => {
    const { setDeleteMode, handleDelete } = props?.handlers

    return (
        <div>
            <>
                <div className="row justify-content-between mx-1 my-3">
                    <div className="col-auto mx-2">
                        <p>Are you sure you want to delete ?</p>
                    </div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn"
                            onClick={() => setDeleteMode(false)}
                        >
                            <IoCloseOutline className="close-icon" />
                        </button>
                    </div>
                </div>
                <div className="row justify-content-end my-3 mx-3 my-3">
                    <div className="col-auto px-0">
                        <button
                            type="button"
                            className="btn cancel-button"
                            onClick={() => setDeleteMode(false)}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn delete-button"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </>
        </div>
    )
}

export default DeleteAccordion