import React from 'react';
import Modal from '../../Shared/UI/Modal';

interface QRCodeProps {
  url: String;
}

const QRCode: React.FC<QRCodeProps> = ({ url }) => {
  const modalTrigger = (
    <span
      className="icon has-text-dark is-medium social-icon"
      style={{ cursor: 'pointer' }}
    >
      <i className="fas fa-solid fa-qrcode fa-lg"></i>
    </span>
  );

  const modalContent = <div className="">Test</div>;
  return <Modal content={modalContent} trigger={modalTrigger}></Modal>;
};

export default QRCode;
