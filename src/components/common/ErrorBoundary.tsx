import { FallbackProps } from 'react-error-boundary';

export const ErrorCallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre data-testid="error-message">{error.message}</pre>
    {resetErrorBoundary && (
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    )}
  </div>
);
