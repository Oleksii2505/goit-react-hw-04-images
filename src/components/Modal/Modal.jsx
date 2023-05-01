import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import { ModalOverlay, ModalContentWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImage }) => {
  const closeModalOnEsc = useCallback(
    (event) => {
      if (event.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  const closeModalOnClickBackdrop = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeModalOnEsc);

    return () => {
      window.removeEventListener('keydown', closeModalOnEsc);
    };
  }, [closeModalOnEsc]);

  return createPortal(
    <ModalOverlay onClick={closeModalOnClickBackdrop}>
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