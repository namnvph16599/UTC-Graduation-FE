import { getClient } from '@/src/configs/apollo';
import {
  GetActiveBannersDocument,
  GetActiveBannersQueryResponse,
  GetActiveBannersQueryVariables,
} from '@/src/graphql/queries/getActiveBanners.generated';

export const activeBannersServerQuery = async () => {
  const client = await getClient();

  return await client.query<GetActiveBannersQueryResponse, GetActiveBannersQueryVariables>({
    query: GetActiveBannersDocument,
  });
};
