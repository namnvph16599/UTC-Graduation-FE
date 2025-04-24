import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReviewCollectionQueryVariables = Types.Exact<{
  filterArgs: Types.ReviewConnectionFilterArgs;
  paginationArgs: Types.PaginationArgs;
}>;


export type ReviewCollectionQueryResponse = (
  { __typename?: 'Query' }
  & { reviewCollection: (
    { __typename?: 'ReviewConnection' }
    & { items: Array<(
      { __typename?: 'ReviewEntity' }
      & Pick<Types.ReviewEntity, 'content' | 'id' | 'rating' | 'updatedAt'>
      & { repair: (
        { __typename?: 'RepairEntity' }
        & Pick<Types.RepairEntity, 'id'>
      ) }
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const ReviewCollectionDocument = gql`
    query reviewCollection($filterArgs: ReviewConnectionFilterArgs!, $paginationArgs: PaginationArgs!) {
  reviewCollection(filterArgs: $filterArgs, paginationArgs: $paginationArgs) {
    items {
      content
      id
      rating
      repair {
        id
      }
      updatedAt
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
export function useReviewCollectionQuery(baseOptions: Apollo.QueryHookOptions<ReviewCollectionQueryResponse, ReviewCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewCollectionQueryResponse, ReviewCollectionQueryVariables>(ReviewCollectionDocument, options);
      }
export function useReviewCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewCollectionQueryResponse, ReviewCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewCollectionQueryResponse, ReviewCollectionQueryVariables>(ReviewCollectionDocument, options);
        }
export type ReviewCollectionQueryHookResult = ReturnType<typeof useReviewCollectionQuery>;
export type ReviewCollectionLazyQueryHookResult = ReturnType<typeof useReviewCollectionLazyQuery>;
export type ReviewCollectionQueryResult = Apollo.QueryResult<ReviewCollectionQueryResponse, ReviewCollectionQueryVariables>;