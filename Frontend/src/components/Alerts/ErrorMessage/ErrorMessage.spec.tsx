import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '.';

const testMessage = 'invalid credentials';

describe('Give the <ErrorMessage/> component', () => {
  test('Should render the icon correctely', () => {
    render(<ErrorMessage message={testMessage} />);

    const image = screen.getByRole('img');
    const imageAtrributeAlt = image.getAttribute('alt');

    expect(image).toBeTruthy();
    expect(imageAtrributeAlt).toBe('Error icon');

  });

  test('Should show error message correctely', () => {
    render(<ErrorMessage message={testMessage} />);

    const errorMessage = screen.getByText(testMessage);

    expect(errorMessage).toBeTruthy();
  });
});
