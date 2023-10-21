import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Signup } from '.';

describe('Given the <Signup />', () => {
  test('Should render texts correctely', () => {
    render(<Signup />, { wrapper: MemoryRouter });

    const signupText = screen.getAllByText(/Sign up/i);
    const loginText = screen.getByText('Login');

    expect(signupText).toBeTruthy();
    expect(loginText).toBeTruthy();
  });

  test('Should redirect to onother page when clicked', () => {
    render(<Signup />, { wrapper: MemoryRouter });

    const loginLink = screen.getByText('Login');

    expect(loginLink.closest('a')).toHaveProperty(
      'href',
      'http://localhost/login'
    );
  });
});
