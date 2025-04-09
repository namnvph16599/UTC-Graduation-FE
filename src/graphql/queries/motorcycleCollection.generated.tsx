import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MotorcycleCollectionQueryVariables = Types.Exact<{
  filterArgs?: Types.InputMaybe<Types.MotorcycleCollectionFilter>;
  pagination?: Types.InputMaybe<Types.PaginationArgs>;
}>;


export type MotorcycleCollectionQueryResponse = (
  { __typename?: 'Query' }
  & { motorcycleCollection: (
    { __typename?: 'MotorcycleConnection' }
    & { items: Array<(
      { __typename?: 'MotorcycleEntity' }
      & Pick<Types.MotorcycleEntity, 'capacity' | 'id' | 'license_plate' | 'manufacture_year' | 'name'>
      & { model?: Types.Maybe<(
        { __typename?: 'ModelEntity' }
        & Pick<Types.ModelEntity, 'name'>
        & { brand?: Types.Maybe<(
          { __typename?: 'BrandEntity' }
          & Pick<Types.BrandEntity, 'name'>
        )> }
      )> }
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const MotorcycleCollectionDocument = gql`
    query motorcycleCollection($filterArgs: MotorcycleCollectionFilter, $pagination: PaginationArgs) {
  motorcycleCollection(filterArgs: $filterArgs, pagination: $pagination) {
    items {
      capacity
      id
      license_plate
      manufacture_year
      model {
        name
        brand {
          name
        }
      }
      name
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
export function useMotorcycleCollectionQuery(baseOptions?: Apollo.QueryHookOptions<MotorcycleCollectionQueryResponse, MotorcycleCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MotorcycleCollectionQueryResponse, MotorcycleCollectionQueryVariables>(MotorcycleCollectionDocument, options);
      }
export function useMotorcycleCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MotorcycleCollectionQueryResponse, MotorcycleCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MotorcycleCollectionQueryResponse, MotorcycleCollectionQueryVariables>(MotorcycleCollectionDocument, options);
        }
export type MotorcycleCollectionQueryHookResult = ReturnType<typeof useMotorcycleCollectionQuery>;
export type MotorcycleCollectionLazyQueryHookResult = ReturnType<typeof useMotorcycleCollectionLazyQuery>;
export type MotorcycleCollectionQueryResult = Apollo.QueryResult<MotorcycleCollectionQueryResponse, MotorcycleCollectionQueryVariables>;