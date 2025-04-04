import { getClient } from '@/src/configs/apollo';
import {
  NewsCollectionDocument,
  NewsCollectionQueryResponse,
  NewsCollectionQueryVariables,
} from '@/src/graphql/queries/newsCollection.generated';

export const newsCollectionServerQuery = async (variables: NewsCollectionQueryVariables) => {
  const client = await getClient();

  return await client.query<NewsCollectionQueryResponse, NewsCollectionQueryVariables>({
    query: NewsCollectionDocument,
    variables: variables,
  });
};
