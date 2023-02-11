import { fireEvent, render } from '@testing-library/react';
import { ErrorCallback } from '../ErrorBoundary';

const PROPS = {
  error: new Error('Random error'),
  resetErrorBoundary: jest.fn(),
};

describe('<ErrorBoundary />', () => {
  it('Should render ErrorBoundary with error message', async () => {
    const { findByTestId } = render(<ErrorCallback {...PROPS} />);
    const element = await findByTestId('error-message');
    expect(element).toBeDefined();
    expect(element.textContent).toBe(PROPS.error.message);
  });

  it('Should remder reset button when resetErrorBoundary is passed', async () => {
    const { findByRole } = render(<ErrorCallback {...PROPS} />);
    const button = await findByRole('button', { name: 'Try again' });
    expect(button).toBeDefined();

    fireEvent.click(button);

    expect(PROPS.resetErrorBoundary).toHaveBeenCalledTimes(1);
  });
});
