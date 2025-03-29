import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type ProductQueryResponse = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'ProductEntity' }
    & Pick<Types.ProductEntity, 'description' | 'id' | 'name' | 'price' | 'quantity'>
  ) }
);


export const ProductDocument = gql`
    query product($id: String!) {
  product(id: $id) {
    description
    id
    name
    price
    quantity
  }
}
    `;
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQueryResponse, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQueryResponse, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQueryResponse, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQueryResponse, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQueryResponse, ProductQueryVariables>;