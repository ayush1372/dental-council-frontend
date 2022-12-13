import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { ScreenReader } from './index';

test('Screen Reader component snapshot', () => {
  const { container } = render(<ScreenReader />);
  expect(container).toMatchSnapshot();
});

test('Information related to the various screen readers', () => {
  render(<ScreenReader />);
  const TextElement = screen.getByTestId('infoId');
  expect(TextElement).toBeInTheDocument();
});
