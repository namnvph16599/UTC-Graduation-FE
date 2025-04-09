import { getClient } from '@/src/configs/apollo';
import {
  ServiceCollectionDocument,
  ServiceCollectionQueryResponse,
  ServiceCollectionQueryVariables,
} from '@/src/graphql/queries/serviceCollection.generated';

export const serviceCollectionServerQuery = async (variables: ServiceCollectionQueryVariables) => {
  const client = await getClient();

  return await client.query<ServiceCollectionQueryResponse, ServiceCollectionQueryVariables>({
    query: ServiceCollectionDocument,
    variables: variables,
  });
};
