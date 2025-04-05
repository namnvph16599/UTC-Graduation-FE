import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelRepairMutationVariables = Types.Exact<{
  input: Types.CancelRepairInput;
}>;


export type CancelRepairMutationResponse = (
  { __typename?: 'Mutation' }
  & { cancelRepair: (
    { __typename?: 'RepairEntity' }
    & Pick<Types.RepairEntity, 'id'>
  ) }
);


export const CancelRepairDocument = gql`
    mutation cancelRepair($input: CancelRepairInput!) {
  cancelRepair(input: $input) {
    id
  }
}
    `;
export function useCancelRepairMutation(baseOptions?: Apollo.MutationHookOptions<CancelRepairMutationResponse, CancelRepairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelRepairMutationResponse, CancelRepairMutationVariables>(CancelRepairDocument, options);
      }
export type CancelRepairMutationHookResult = ReturnType<typeof useCancelRepairMutation>;
export type CancelRepairMutationResult = Apollo.MutationResult<CancelRepairMutationResponse>;
export type CancelRepairMutationOptions = Apollo.BaseMutationOptions<CancelRepairMutationResponse, CancelRepairMutationVariables>;