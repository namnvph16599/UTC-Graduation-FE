import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductCollectionQueryVariables = Types.Exact<{
  paginationArgs?: Types.InputMaybe<Types.PaginationArgs>;
}>;


export type ProductCollectionQueryResponse = (
  { __typename?: 'Query' }
  & { productCollection: (
    { __typename?: 'ProductConnection' }
    & { items: Array<(
      { __typename?: 'ProductEntity' }
      & Pick<Types.ProductEntity, 'description' | 'id' | 'name' | 'price' | 'quantity'>
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const ProductCollectionDocument = gql`
    query productCollection($paginationArgs: PaginationArgs) {
  productCollection(paginationArgs: $paginationArgs) {
    items {
      description
      id
      name
      price
      quantity
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
export function useProductCollectionQuery(baseOptions?: Apollo.QueryHookOptions<ProductCollectionQueryResponse, ProductCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductCollectionQueryResponse, ProductCollectionQueryVariables>(ProductCollectionDocument, options);
      }
export function useProductCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductCollectionQueryResponse, ProductCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductCollectionQueryResponse, ProductCollectionQueryVariables>(ProductCollectionDocument, options);
        }
export type ProductCollectionQueryHookResult = ReturnType<typeof useProductCollectionQuery>;
export type ProductCollectionLazyQueryHookResult = ReturnType<typeof useProductCollectionLazyQuery>;
export type ProductCollectionQueryResult = Apollo.QueryResult<ProductCollectionQueryResponse, ProductCollectionQueryVariables>;