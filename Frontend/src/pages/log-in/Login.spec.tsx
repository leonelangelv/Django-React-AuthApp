import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Login } from '.';

describe('Given the <Login />', () => {
  test('Should render texts correctely', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const loginText = screen.getAllByText('Login');
    const passwordText = screen.getByText('Password');
    const singupText = screen.getByText('Sign up');

    expect(loginText).toBeTruthy();
    expect(passwordText).toBeTruthy();
    expect(singupText).toBeTruthy();
  });

  test('Should redirect to another page when clicked', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const passwordLink = screen.getByText('Password');
    const signupLink = screen.getByText('Sign up');

    expect(passwordLink.closest('a')).toHaveProperty(
      'href',
      'http://localhost/password-recovery'
    );
    expect(signupLink.closest('a')).toHaveProperty(
      'href',
      'http://localhost/signup'
    );
  });
});
