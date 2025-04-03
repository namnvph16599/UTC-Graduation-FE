import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NewsCollectionQueryVariables = Types.Exact<{
  paginationArgs: Types.PaginationArgs;
}>;


export type NewsCollectionQueryResponse = (
  { __typename?: 'Query' }
  & { newsCollection: (
    { __typename?: 'NewsConnection' }
    & { items: Array<(
      { __typename?: 'NewsEntity' }
      & Pick<Types.NewsEntity, 'description' | 'id' | 'image_url' | 'title' | 'createdAt'>
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const NewsCollectionDocument = gql`
    query newsCollection($paginationArgs: PaginationArgs!) {
  newsCollection(paginationArgs: $paginationArgs) {
    items {
      description
      id
      image_url
      title
      createdAt
    }
    meta {
      currentPage
      hasNextPage
      hasPreviousPage
      limit
      totalItem
      totalPage
    }
  }
}
    `;
export function useNewsCollectionQuery(baseOptions: Apollo.QueryHookOptions<NewsCollectionQueryResponse, NewsCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsCollectionQueryResponse, NewsCollectionQueryVariables>(NewsCollectionDocument, options);
      }
export function useNewsCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsCollectionQueryResponse, NewsCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsCollectionQueryResponse, NewsCollectionQueryVariables>(NewsCollectionDocument, options);
        }
export type NewsCollectionQueryHookResult = ReturnType<typeof useNewsCollectionQuery>;
export type NewsCollectionLazyQueryHookResult = ReturnType<typeof useNewsCollectionLazyQuery>;
export type NewsCollectionQueryResult = Apollo.QueryResult<NewsCollectionQueryResponse, NewsCollectionQueryVariables>;