import React from 'react';

export function MinutesCell({ value }: { value: string }): React.ReactElement {
  if (!value) {
    return <>-</>;
  }
  const number = Number(value);
  if (isNaN(number)) {
    return <>-</>;
  }
  const minutes = Math.floor(number / 60);
  const seconds = number % 60;
  return (
    <>
      {minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </>
  );
}

export function PercetualCell({
  value
}: {
  value: string;
}): React.ReactElement {
  if (!value) {
    return <>-</>;
  }
  const number = Number(value);
  if (isNaN(number)) {
    return <>-</>;
  }
  return <>{number.toFixed(0)}%</>;
}

export function RateCell({ value }: { value: string }): React.ReactElement {
  if (!value) {
    return <>-</>;
  }
  const number = Number(value);
  if (isNaN(number)) {
    return <>-</>;
  }
  return <>{number.toFixed(1)}</>;
}

export function ValueOrEmptyCell({
  value
}: {
  value: string;
}): React.ReactElement {
  const number = Number(value);
  if (isNaN(number)) {
    return <>{value || '-'}</>;
  }

  return <>{number.toFixed(0) || '-'}</>;
}
