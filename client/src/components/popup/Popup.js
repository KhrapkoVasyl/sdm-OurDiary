import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backdropFilter: 'blur(10px)',
  },
};

Modal.setAppElement('#root');

const Popup = ({ title, children, isOpen, openModal, closeModal }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>{title}</h2>
          <button onClick={closeModal}>close</button>
        </div>
        {children}
      </Modal>
    </div>
  );
};

export default Popup;
