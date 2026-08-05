import React from 'react';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => (
  <div className="rounded-lg border border-neutral-100 p-4 shadow-sm">
    {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
    {children}
  </div>
);
