import { getClient } from '@/src/configs/apollo';
import {
  BrandCollectionDocument,
  BrandCollectionQueryResponse,
  BrandCollectionQueryVariables,
} from '@/src/graphql/queries/brandCollection.generated';

export const brandCollectionServerQuery = async (variables: BrandCollectionQueryVariables) => {
  const client = await getClient();

  return await client.query<BrandCollectionQueryResponse, BrandCollectionQueryVariables>({
    query: BrandCollectionDocument,
    variables: variables,
  });
};
