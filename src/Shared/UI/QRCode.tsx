import React from 'react';
import Modal from './Modal';
import { default as ReactQRCode } from 'react-qr-code';
import { Trans } from 'react-i18next';
import logo from '../../assets/logo-with-background.png';
import './QRCode.scss';

interface QRCodeProps {
  url: string;
  caption: string;
}

const QRCode: React.FC<QRCodeProps> = ({ url, caption }) => {
  if (!url) {
    return <></>;
  }

  const modalTrigger = (
    <span
      className="icon has-text-dark is-medium social-icon"
      style={{ cursor: 'pointer' }}
    >
      <i className="fas fa-solid fa-qrcode fa-lg"></i>
    </span>
  );

  const modalContent = (
    <div className="box has-text-centered qr-code">
      <div className="content">
        <h2 className="title">{caption}</h2>

        <ReactQRCode value={url} size={180} />

        <p>
          <Trans>scanCodeToAccessIt</Trans>
        </p>

        <span className="logo-container">
          <img src={logo} alt="Go Champs" className="logo" />

          <h1 className="title is-size-4">GoChamps!</h1>
        </span>
      </div>
    </div>
  );

  return <Modal content={modalContent} trigger={modalTrigger}></Modal>;
};

export default QRCode;
