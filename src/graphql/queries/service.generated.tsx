import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ServiceQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type ServiceQueryResponse = (
  { __typename?: 'Query' }
  & { service: (
    { __typename?: 'ServicesEntity' }
    & Pick<Types.ServicesEntity, 'description' | 'id' | 'name' | 'price'>
  ) }
);


export const ServiceDocument = gql`
    query service($id: String!) {
  service(id: $id) {
    description
    id
    name
    price
  }
}
    `;
export function useServiceQuery(baseOptions: Apollo.QueryHookOptions<ServiceQueryResponse, ServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServiceQueryResponse, ServiceQueryVariables>(ServiceDocument, options);
      }
export function useServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServiceQueryResponse, ServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServiceQueryResponse, ServiceQueryVariables>(ServiceDocument, options);
        }
export type ServiceQueryHookResult = ReturnType<typeof useServiceQuery>;
export type ServiceLazyQueryHookResult = ReturnType<typeof useServiceLazyQuery>;
export type ServiceQueryResult = Apollo.QueryResult<ServiceQueryResponse, ServiceQueryVariables>;