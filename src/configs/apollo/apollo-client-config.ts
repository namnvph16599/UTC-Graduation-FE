import { HttpLink } from '@apollo/client';
import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { AppVariables, IS_CLIENT } from '@/src/constants/env';
import { getItemLocalstorage, LocalStorageKeyEnum } from '@/src/utils/localstorate.util';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const apiUrl = AppVariables.apiUrl;

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  let token = '';

  if (IS_CLIENT) {
    token = getItemLocalstorage(LocalStorageKeyEnum.AccessToken) ?? '';
  }

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: `${apiUrl}/graphql`,
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
    credentials: 'include',
  });
});
