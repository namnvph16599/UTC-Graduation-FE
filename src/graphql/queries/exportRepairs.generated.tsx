import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExportRepairsQueryVariables = Types.Exact<{
  input: Types.ExportRepairsInput;
}>;


export type ExportRepairsQueryResponse = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'exportRepairs'>
);


export const ExportRepairsDocument = gql`
    query exportRepairs($input: ExportRepairsInput!) {
  exportRepairs(input: $input)
}
    `;
export function useExportRepairsQuery(baseOptions: Apollo.QueryHookOptions<ExportRepairsQueryResponse, ExportRepairsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportRepairsQueryResponse, ExportRepairsQueryVariables>(ExportRepairsDocument, options);
      }
export function useExportRepairsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportRepairsQueryResponse, ExportRepairsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportRepairsQueryResponse, ExportRepairsQueryVariables>(ExportRepairsDocument, options);
        }
export type ExportRepairsQueryHookResult = ReturnType<typeof useExportRepairsQuery>;
export type ExportRepairsLazyQueryHookResult = ReturnType<typeof useExportRepairsLazyQuery>;
export type ExportRepairsQueryResult = Apollo.QueryResult<ExportRepairsQueryResponse, ExportRepairsQueryVariables>;