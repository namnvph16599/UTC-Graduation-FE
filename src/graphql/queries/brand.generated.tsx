import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BrandQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type BrandQueryResponse = (
  { __typename?: 'Query' }
  & { brand: (
    { __typename?: 'BrandEntity' }
    & Pick<Types.BrandEntity, 'id' | 'name'>
    & { models?: Types.Maybe<Array<(
      { __typename?: 'ModelEntity' }
      & Pick<Types.ModelEntity, 'id' | 'name'>
    )>> }
  ) }
);


export const BrandDocument = gql`
    query brand($id: String!) {
  brand(id: $id) {
    id
    name
    models {
      id
      name
    }
  }
}
    `;
export function useBrandQuery(baseOptions: Apollo.QueryHookOptions<BrandQueryResponse, BrandQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrandQueryResponse, BrandQueryVariables>(BrandDocument, options);
      }
export function useBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandQueryResponse, BrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrandQueryResponse, BrandQueryVariables>(BrandDocument, options);
        }
export type BrandQueryHookResult = ReturnType<typeof useBrandQuery>;
export type BrandLazyQueryHookResult = ReturnType<typeof useBrandLazyQuery>;
export type BrandQueryResult = Apollo.QueryResult<BrandQueryResponse, BrandQueryVariables>;