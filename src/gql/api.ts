import { ApolloClient, HttpLink, InMemoryCache, Operation, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { getEnvString } from 'app/utils/env';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

const BASE_QUERY_URL = getEnvString({ name: 'baseQueryUrl' });
const BASE_WS_URL = getEnvString({ name: 'baseWsUrl' });

const httpLink = new HttpLink({
  uri: BASE_QUERY_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: BASE_WS_URL,
  }),
);

export const ApolloSplitLink = split(
  (op: Operation) => {
    const defintion = getMainDefinition(op.query);
    return (
      defintion.kind === Kind.OPERATION_DEFINITION &&
      defintion.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link: ApolloSplitLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {},
});
