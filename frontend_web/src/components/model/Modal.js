import "./Modal.css"
import React, {Component} from 'react';

const Modal = ({ handleClose, show, children, title, footer }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const otherClick=(e)=>{
        // e.preventDefault()
        if(e.target.id==='modalWindow'){
            handleClose()
        }
    }
    return (
        <div className={showHideClassName} onClick={otherClick} id="modalWindow">
            <div className="modal-main p-0">
                <div className="row bg-light m-0 p-2">
                    <div className="col p-0">
                        <h5>{title}</h5>
                    </div>
                    <div className="col p-0">
                        <button className="float-md-right btn btn-default pt-0 pb-0 text-danger" onClick={handleClose}>X</button>
                    </div>
                </div>
                <div className="row m-0 p-2">
                    <div className="col p-0">
                        {children}
                    </div>
                </div>
                <div className="bg-light row m-0 p-2">
                    <div className="col p-0">
                        <div className="float-right">
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;