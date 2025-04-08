import { cookies } from 'next/headers';
import { getClient } from '@/src/configs/apollo';
import { MeDocument, MeQueryResponse, MeQueryVariables } from '@/src/graphql/queries/me.generated';

export const meServerQuery = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    // Optionally return null or throw an error
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
