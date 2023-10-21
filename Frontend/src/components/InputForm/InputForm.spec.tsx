import { render, screen} from '@testing-library/react';
import { InputForm } from './';

describe('Given the <InputForm />', () => {
  test('Should renders InputForm correctely', () => {
    render(
      <InputForm
        type='text'
        placeholder='Test Placeholder'
        hasError={false}
        errorMessage=''
      />
    );

    const inputType = screen.getByRole("textbox")
    const input = screen.getByPlaceholderText('Test Placeholder');

    expect(inputType).toBeTruthy();
    expect(input).toBeTruthy();
  });

  test('Should display the entries with an error message', () => {
    render(
      <InputForm
        type='text'
        placeholder='Test Placeholder'
        hasError={true}
        errorMessage='Test Error Message'
      />
    );

    const errorMessage = screen.getByText('Test Error Message');

    expect(errorMessage).toBeTruthy();
  });
});
