import classNames from 'classnames';
import React, { Fragment, ReactNode, useState } from 'react';

interface ModalProps {
  content: ReactNode;
  isOpenFromOutside?: boolean;
  trigger: ReactNode;
  triggerClasses?: string;
}

const Modal: React.FC<ModalProps> = ({
  content,
  trigger,
  isOpenFromOutside = false,
  triggerClasses = ''
}) => {
  const [isOpen, setIsOpen] = useState(isOpenFromOutside);

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault();

    setIsOpen(true);
  };

  const modalClasses = classNames('modal', {
    'is-active': isOpen
  });

  return (
    <Fragment>
      <span className={triggerClasses} onClick={openModal}>
        {trigger}
      </span>
      <div className={modalClasses}>
        <div className="modal-background"></div>
        <div className="modal-content">{content}</div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    </Fragment>
  );
};

export default Modal;
