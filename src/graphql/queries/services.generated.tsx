import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ServicesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ServicesQueryResponse = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'ServicesEntity' }
    & Pick<Types.ServicesEntity, 'createdAt' | 'description' | 'id' | 'name' | 'price'>
  )> }
);


export const ServicesDocument = gql`
    query services {
  services {
    createdAt
    description
    id
    name
    price
  }
}
    `;
export function useServicesQuery(baseOptions?: Apollo.QueryHookOptions<ServicesQueryResponse, ServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServicesQueryResponse, ServicesQueryVariables>(ServicesDocument, options);
      }
export function useServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServicesQueryResponse, ServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServicesQueryResponse, ServicesQueryVariables>(ServicesDocument, options);
        }
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<typeof useServicesLazyQuery>;
export type ServicesQueryResult = Apollo.QueryResult<ServicesQueryResponse, ServicesQueryVariables>;