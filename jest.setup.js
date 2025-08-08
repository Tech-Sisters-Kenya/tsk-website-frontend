/* global jest */
import React from 'react';
import '@testing-library/jest-dom';

// mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return React.createElement('img', {
      ...props,
      alt: props.alt || 'mocked image',
    });
  },
}));
