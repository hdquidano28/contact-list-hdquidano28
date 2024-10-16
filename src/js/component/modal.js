import React from "react";


const Modal = ({ show, onClose, onConfirm }) => {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure?</h5>
            <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            If you delete this the entire universe will go down!
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Oh no!
            </button>
            <button type="button" className="btn btn-secondary" onClick={onConfirm}>
              Yes baby!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
