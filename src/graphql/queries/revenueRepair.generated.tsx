import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RevenueRepairQueryVariables = Types.Exact<{
  input: Types.RevenueRepairInput;
}>;


export type RevenueRepairQueryResponse = (
  { __typename?: 'Query' }
  & { revenueRepair: Array<(
    { __typename?: 'RevenueRepair' }
    & Pick<Types.RevenueRepair, 'endDate' | 'price' | 'startDate' | 'time'>
  )> }
);


export const RevenueRepairDocument = gql`
    query revenueRepair($input: RevenueRepairInput!) {
  revenueRepair(input: $input) {
    endDate
    price
    startDate
    time
  }
}
    `;
export function useRevenueRepairQuery(baseOptions: Apollo.QueryHookOptions<RevenueRepairQueryResponse, RevenueRepairQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RevenueRepairQueryResponse, RevenueRepairQueryVariables>(RevenueRepairDocument, options);
      }
export function useRevenueRepairLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RevenueRepairQueryResponse, RevenueRepairQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RevenueRepairQueryResponse, RevenueRepairQueryVariables>(RevenueRepairDocument, options);
        }
export type RevenueRepairQueryHookResult = ReturnType<typeof useRevenueRepairQuery>;
export type RevenueRepairLazyQueryHookResult = ReturnType<typeof useRevenueRepairLazyQuery>;
export type RevenueRepairQueryResult = Apollo.QueryResult<RevenueRepairQueryResponse, RevenueRepairQueryVariables>;