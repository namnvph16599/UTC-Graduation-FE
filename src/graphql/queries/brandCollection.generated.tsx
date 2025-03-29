import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BrandCollectionQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationArgs>;
}>;


export type BrandCollectionQueryResponse = (
  { __typename?: 'Query' }
  & { brandCollection: (
    { __typename?: 'BrandConnection' }
    & { items: Array<(
      { __typename?: 'BrandEntity' }
      & Pick<Types.BrandEntity, 'id' | 'name'>
      & { models?: Types.Maybe<Array<(
        { __typename?: 'ModelEntity' }
        & Pick<Types.ModelEntity, 'id' | 'name'>
      )>> }
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const BrandCollectionDocument = gql`
    query brandCollection($pagination: PaginationArgs) {
  brandCollection(pagination: $pagination) {
    items {
      id
      name
      models {
        id
        name
      }
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
export function useBrandCollectionQuery(baseOptions?: Apollo.QueryHookOptions<BrandCollectionQueryResponse, BrandCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrandCollectionQueryResponse, BrandCollectionQueryVariables>(BrandCollectionDocument, options);
      }
export function useBrandCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandCollectionQueryResponse, BrandCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrandCollectionQueryResponse, BrandCollectionQueryVariables>(BrandCollectionDocument, options);
        }
export type BrandCollectionQueryHookResult = ReturnType<typeof useBrandCollectionQuery>;
export type BrandCollectionLazyQueryHookResult = ReturnType<typeof useBrandCollectionLazyQuery>;
export type BrandCollectionQueryResult = Apollo.QueryResult<BrandCollectionQueryResponse, BrandCollectionQueryVariables>;