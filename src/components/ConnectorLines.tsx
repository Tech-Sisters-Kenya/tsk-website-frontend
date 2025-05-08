import React from 'react';
import clsx from 'clsx';

function ConnectorLines({
  top,
  left,
  right,
  bottom,
  style,
}: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  style: string;
}) {
  return (
    <div
      className={clsx('absolute hidden md:block bg-tsk-primary-dark transform', style)}
      style={{
        top,
        left,
        right,
        bottom,
      }}
    />
  );
}

export default ConnectorLines;
