import "./Modal.css"
import React, {Component} from 'react';

class Modal extends Component {
    otherClick(e) {
        const {modalId, handleClose} = this.props
        if (e.target.id === modalId) {
            handleClose()
        }
    }

    render() {
        const {modalId, handleClose, show, content, title, footer, large, error} = this.props
        const showHideClassName = show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName} onClick={this.otherClick.bind(this)} id={modalId}>
                <div className={large ? "modal-main p-0 large" : "modal-main p-0"}>
                    <div className="row bg-light m-0 p-2">
                        {title && <div className="col p-0">
                            <h5 className="modal-title">{title}</h5>
                        </div>}
                        <div className="col p-0">
                            <div className="btb-group float-right ml-2">
                                <button className="btn btn-default pt-0 pb-0 text-danger" onClick={handleClose}>X
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 p-2">
                        <div className="col p-0">
                            {content}
                        </div>
                    </div>
                    {footer && <div className="bg-light row m-0 p-2">
                        <div className="col p-0">
                            {error && <i className="text-danger">{error}</i>}
                            <div className="float-right">
                                {footer}
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}


export default Modal;