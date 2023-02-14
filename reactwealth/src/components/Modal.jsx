import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

const Modal = ({isOpen, children, onClose}) => {

    if(!isOpen) {
        document.body.classList.remove('active-modal')
        return <></>
      }
      document.body.classList.add('active-modal')
    return (
        <div className="modal">
          <div onClick={onClose} className="overlay"></div>
          <div className="modal-content">
                {children}
            <IconButton sx={{ position: 'absolute', top: -15, right: -15}} variant={"text"} color={'inherit'} className="close-modal" onClick={onClose}>
              <CancelIcon/>
            </IconButton>
          </div>
        </div>
    );
};

export default Modal;