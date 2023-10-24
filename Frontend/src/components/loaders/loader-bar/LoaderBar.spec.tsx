import { render, screen } from '@testing-library/react';

import { LoaderBar } from '.';

describe('Given the <LoaderBar />', () => {
  test('Should render the texts correctely', () => {
    const testMessage = 'Deleting';
    render(<LoaderBar message={testMessage} />);

    const message = screen.getByText(/Deleting/i);

    expect(message).toBeTruthy();
  });
});
