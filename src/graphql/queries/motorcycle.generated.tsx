import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MotorcycleQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type MotorcycleQueryResponse = (
  { __typename?: 'Query' }
  & { motorcycle: (
    { __typename?: 'MotorcycleEntity' }
    & Pick<Types.MotorcycleEntity, 'capacity' | 'id' | 'license_plate' | 'manufacture_year' | 'name'>
    & { model?: Types.Maybe<(
      { __typename?: 'ModelEntity' }
      & Pick<Types.ModelEntity, 'id'>
      & { brand?: Types.Maybe<(
        { __typename?: 'BrandEntity' }
        & Pick<Types.BrandEntity, 'id'>
      )> }
    )> }
  ) }
);


export const MotorcycleDocument = gql`
    query motorcycle($id: String!) {
  motorcycle(id: $id) {
    capacity
    id
    license_plate
    manufacture_year
    model {
      brand {
        id
      }
      id
    }
    name
  }
}
    `;
export function useMotorcycleQuery(baseOptions: Apollo.QueryHookOptions<MotorcycleQueryResponse, MotorcycleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MotorcycleQueryResponse, MotorcycleQueryVariables>(MotorcycleDocument, options);
      }
export function useMotorcycleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MotorcycleQueryResponse, MotorcycleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MotorcycleQueryResponse, MotorcycleQueryVariables>(MotorcycleDocument, options);
        }
export type MotorcycleQueryHookResult = ReturnType<typeof useMotorcycleQuery>;
export type MotorcycleLazyQueryHookResult = ReturnType<typeof useMotorcycleLazyQuery>;
export type MotorcycleQueryResult = Apollo.QueryResult<MotorcycleQueryResponse, MotorcycleQueryVariables>;