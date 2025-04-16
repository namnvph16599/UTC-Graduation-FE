import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BannerCollectionQueryVariables = Types.Exact<{
  paginationArgs?: Types.InputMaybe<Types.PaginationArgs>;
}>;


export type BannerCollectionQueryResponse = (
  { __typename?: 'Query' }
  & { bannerCollection: (
    { __typename?: 'BannerConnection' }
    & { items: Array<(
      { __typename?: 'BannerEntity' }
      & Pick<Types.BannerEntity, 'active' | 'id' | 'image' | 'name' | 'priority_number'>
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const BannerCollectionDocument = gql`
    query bannerCollection($paginationArgs: PaginationArgs) {
  bannerCollection(paginationArgs: $paginationArgs) {
    items {
      active
      id
      image
      name
      priority_number
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
export function useBannerCollectionQuery(baseOptions?: Apollo.QueryHookOptions<BannerCollectionQueryResponse, BannerCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BannerCollectionQueryResponse, BannerCollectionQueryVariables>(BannerCollectionDocument, options);
      }
export function useBannerCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BannerCollectionQueryResponse, BannerCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BannerCollectionQueryResponse, BannerCollectionQueryVariables>(BannerCollectionDocument, options);
        }
export type BannerCollectionQueryHookResult = ReturnType<typeof useBannerCollectionQuery>;
export type BannerCollectionLazyQueryHookResult = ReturnType<typeof useBannerCollectionLazyQuery>;
export type BannerCollectionQueryResult = Apollo.QueryResult<BannerCollectionQueryResponse, BannerCollectionQueryVariables>;