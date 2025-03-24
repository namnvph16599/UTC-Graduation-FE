'use client';
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';
import { AppVariables } from '@/src/constants/env';
import { getItemLocalstorage, LocalStorageKeyEnum } from '@/src/utils/localstorate.util';

export function getHttpLink() {
  const httpLink = new HttpLink({
    uri: AppVariables.apiUrl + '/graphql',
    fetchOptions: { cache: 'no-store' },
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // Retrieve the latest token (from cookies, local storage, or a secure method)
    const token = getItemLocalstorage(LocalStorageKeyEnum.AccessToken);

    // Add the Authorization header to the request
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }));

    // Pass the request to the next link in the chain
    return forward(operation);
  });

  // Combine the middleware and HTTP links
  return ApolloLink.from([authMiddleware, httpLink]);
}

// have a function to create a client for you
function makeClient() {
  const httpLink = getHttpLink();

  return new ApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
