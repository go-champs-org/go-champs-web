import React from 'react';
import './CardV2.scss';

interface CardV2Props {
  className?: string;
  children: React.ReactNode;
}

const CardV2: React.FC<CardV2Props> = ({ className, children }) => {
  return (
    <div className={`card-v2${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
};

export default CardV2;
