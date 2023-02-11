import { ApolloProvider } from '@apollo/client';
import { ErrorCallback } from 'app/components/common';
import { apolloClient } from 'app/gql/api';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';

const App: React.FC = () => (
  <ErrorBoundary FallbackComponent={ErrorCallback}>
    <ApolloProvider client={apolloClient}>
      <div className="App">React + Vite + Apollo Graphql + Redux advance template</div>
    </ApolloProvider>
  </ErrorBoundary>
);

export default App;
