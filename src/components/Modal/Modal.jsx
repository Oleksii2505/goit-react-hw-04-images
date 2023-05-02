import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { ModalOverlay, ModalContentWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImage }) => {
  useEffect(() => {
    const closeModalOnEsc = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', closeModalOnEsc);

    return () => document.removeEventListener('keydown', closeModalOnEsc);
  }, [closeModal]);

  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ModalContentWindow>
        <img src={largeImage} alt="tag" />
      </ModalContentWindow>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};