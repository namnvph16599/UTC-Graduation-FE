import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ServiceCollectionQueryVariables = Types.Exact<{
  paginationArgs?: Types.InputMaybe<Types.PaginationArgs>;
}>;


export type ServiceCollectionQueryResponse = (
  { __typename?: 'Query' }
  & { serviceCollection: (
    { __typename?: 'ServiceConnection' }
    & { items: Array<(
      { __typename?: 'ServicesEntity' }
      & Pick<Types.ServicesEntity, 'createdAt' | 'deletedAt' | 'description' | 'id' | 'name' | 'price' | 'updatedAt'>
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const ServiceCollectionDocument = gql`
    query serviceCollection($paginationArgs: PaginationArgs) {
  serviceCollection(paginationArgs: $paginationArgs) {
    items {
      createdAt
      deletedAt
      description
      id
      name
      price
      updatedAt
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
export function useServiceCollectionQuery(baseOptions?: Apollo.QueryHookOptions<ServiceCollectionQueryResponse, ServiceCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServiceCollectionQueryResponse, ServiceCollectionQueryVariables>(ServiceCollectionDocument, options);
      }
export function useServiceCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServiceCollectionQueryResponse, ServiceCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServiceCollectionQueryResponse, ServiceCollectionQueryVariables>(ServiceCollectionDocument, options);
        }
export type ServiceCollectionQueryHookResult = ReturnType<typeof useServiceCollectionQuery>;
export type ServiceCollectionLazyQueryHookResult = ReturnType<typeof useServiceCollectionLazyQuery>;
export type ServiceCollectionQueryResult = Apollo.QueryResult<ServiceCollectionQueryResponse, ServiceCollectionQueryVariables>;