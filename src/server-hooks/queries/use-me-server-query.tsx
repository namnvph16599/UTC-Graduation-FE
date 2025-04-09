import { getClient } from '@/src/configs/apollo';
import { MeDocument, MeQueryResponse, MeQueryVariables } from '@/src/graphql/queries/me.generated';
import { getTokenServer } from '@/src/utils/get-token-server.util';

export const meServerQuery = async () => {
  const token = await getTokenServer();

  if (!token) {
    return { data: null };
  }

  const client = await getClient();
  return await client.query<MeQueryResponse, MeQueryVariables>({
    query: MeDocument,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });
};
