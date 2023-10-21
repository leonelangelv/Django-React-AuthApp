import { render, screen } from '@testing-library/react';

import { InputErrorMessage } from '.';

describe('Given the <InputErrorMessage />', () => {
  test('Should render the error message correctely', () => {
    const testMessage = 'Form incomplete';
    render(<InputErrorMessage message={testMessage} />);

    const message = screen.getByText(testMessage);

    expect(message).toBeTruthy();
  });
});
