import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyMotorcyclesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyMotorcyclesQueryResponse = (
  { __typename?: 'Query' }
  & { myMotorcycles: (
    { __typename?: 'MotorcycleConnection' }
    & { items: Array<(
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
    )> }
  ) }
);


export const MyMotorcyclesDocument = gql`
    query myMotorcycles {
  myMotorcycles {
    items {
      capacity
      id
      license_plate
      manufacture_year
      model {
        id
        brand {
          id
        }
      }
      name
    }
  }
}
    `;
export function useMyMotorcyclesQuery(baseOptions?: Apollo.QueryHookOptions<MyMotorcyclesQueryResponse, MyMotorcyclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyMotorcyclesQueryResponse, MyMotorcyclesQueryVariables>(MyMotorcyclesDocument, options);
      }
export function useMyMotorcyclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyMotorcyclesQueryResponse, MyMotorcyclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyMotorcyclesQueryResponse, MyMotorcyclesQueryVariables>(MyMotorcyclesDocument, options);
        }
export type MyMotorcyclesQueryHookResult = ReturnType<typeof useMyMotorcyclesQuery>;
export type MyMotorcyclesLazyQueryHookResult = ReturnType<typeof useMyMotorcyclesLazyQuery>;
export type MyMotorcyclesQueryResult = Apollo.QueryResult<MyMotorcyclesQueryResponse, MyMotorcyclesQueryVariables>;