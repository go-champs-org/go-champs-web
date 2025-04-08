import classNames from 'classnames';
import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';

interface ModalProps {
  content: ReactNode;
  isOpenFromOutside?: boolean;
  trigger?: ReactNode;
  triggerClasses?: string;
  modalContentClasses?: string;
}

const Modal: React.FC<ModalProps> = ({
  content,
  trigger,
  isOpenFromOutside = false,
  triggerClasses = '',
  modalContentClasses = ''
}) => {
  const refContent = useRef<HTMLDivElement>(null);
  const refTrigger = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(isOpenFromOutside);

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = (event: UIEvent) => {
    const isContentClick = event
      .composedPath()
      .includes(refContent.current as HTMLDivElement);
    const isTriggerClick = event
      .composedPath()
      .includes(refTrigger.current as HTMLSpanElement);
    if (!isContentClick && !isTriggerClick) {
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

  const modalContentClass = classNames('modal-content', modalContentClasses);

  return (
    <Fragment>
      {trigger && (
        <span ref={refTrigger} className={triggerClasses} onClick={openModal}>
          {trigger}
        </span>
      )}
      <div className={modalClasses}>
        <div className="modal-background"></div>
        <div className={modalContentClass} ref={refContent}>
          {content}
        </div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    </Fragment>
  );
};

export default Modal;
