import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CountRepairsByStatusesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CountRepairsByStatusesQueryResponse = (
  { __typename?: 'Query' }
  & { countRepairsByStatuses: Array<(
    { __typename?: 'CountRepairByStatus' }
    & Pick<Types.CountRepairByStatus, 'status' | 'total'>
  )> }
);


export const CountRepairsByStatusesDocument = gql`
    query countRepairsByStatuses {
  countRepairsByStatuses {
    status
    total
  }
}
    `;
export function useCountRepairsByStatusesQuery(baseOptions?: Apollo.QueryHookOptions<CountRepairsByStatusesQueryResponse, CountRepairsByStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountRepairsByStatusesQueryResponse, CountRepairsByStatusesQueryVariables>(CountRepairsByStatusesDocument, options);
      }
export function useCountRepairsByStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountRepairsByStatusesQueryResponse, CountRepairsByStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountRepairsByStatusesQueryResponse, CountRepairsByStatusesQueryVariables>(CountRepairsByStatusesDocument, options);
        }
export type CountRepairsByStatusesQueryHookResult = ReturnType<typeof useCountRepairsByStatusesQuery>;
export type CountRepairsByStatusesLazyQueryHookResult = ReturnType<typeof useCountRepairsByStatusesLazyQuery>;
export type CountRepairsByStatusesQueryResult = Apollo.QueryResult<CountRepairsByStatusesQueryResponse, CountRepairsByStatusesQueryVariables>;