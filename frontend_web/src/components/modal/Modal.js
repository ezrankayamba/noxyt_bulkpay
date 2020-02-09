import "./Modal.css"
import React from 'react';

const Modal = ({modalId, handleClose, show, children, title, footer, large}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const otherClick = (e) => {
        console.log("Click outside: ", e.target.id)
        if (e.target.id === modalId) {
            handleClose()
        }
    }
    return (
        <div className={showHideClassName} onClick={otherClick} id={modalId}>
            <div className={large?"modal-main p-0 large":"modal-main p-0"}>
                <div className="row bg-light m-0 p-2">
                    <div className="col p-0">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="col p-0">
                        <div className="btb-group float-right ml-2">
                            <button className="btn btn-default pt-0 pb-0 text-danger" onClick={handleClose}>X</button>
                        </div>
                    </div>
                </div>
                <div className="row m-0 p-2">
                    <div className="col p-0">
                        {children}
                    </div>
                </div>
                {footer && <div className="bg-light row m-0 p-2">
                    <div className="col p-0">
                        <div className="float-right">
                            {footer}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Modal;