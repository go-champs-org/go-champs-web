import classNames from 'classnames';
import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';

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
  const ref = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(isOpenFromOutside);

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault();

    setIsOpen(true);
  };

  const closeModal = (event: UIEvent) => {
    event.preventDefault();

    const isTriggerClick = event
      .composedPath()
      .includes(ref.current as HTMLSpanElement);
    if (!isTriggerClick) {
      setIsOpen(false);
    }
  };

  const closeModalByKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModalByKey);

    return () => {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModalByKey);
    };
  }, []);

  const modalClasses = classNames('modal', {
    'is-active': isOpen
  });

  return (
    <Fragment>
      <span className={triggerClasses} onClick={openModal} ref={ref}>
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
