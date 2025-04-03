import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NewsQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type NewsQueryResponse = (
  { __typename?: 'Query' }
  & { news: (
    { __typename?: 'NewsEntity' }
    & Pick<Types.NewsEntity, 'content' | 'description' | 'id' | 'image_url' | 'title' | 'createdAt'>
  ) }
);


export const NewsDocument = gql`
    query news($id: String!) {
  news(id: $id) {
    content
    description
    id
    image_url
    title
    createdAt
  }
}
    `;
export function useNewsQuery(baseOptions: Apollo.QueryHookOptions<NewsQueryResponse, NewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsQueryResponse, NewsQueryVariables>(NewsDocument, options);
      }
export function useNewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsQueryResponse, NewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsQueryResponse, NewsQueryVariables>(NewsDocument, options);
        }
export type NewsQueryHookResult = ReturnType<typeof useNewsQuery>;
export type NewsLazyQueryHookResult = ReturnType<typeof useNewsLazyQuery>;
export type NewsQueryResult = Apollo.QueryResult<NewsQueryResponse, NewsQueryVariables>;