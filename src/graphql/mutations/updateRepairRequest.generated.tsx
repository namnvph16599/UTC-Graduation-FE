import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateRepairRequestMutationVariables = Types.Exact<{
  input: Types.UpdateRepairInput;
}>;


export type UpdateRepairRequestMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateRepairRequest: (
    { __typename?: 'RepairEntity' }
    & Pick<Types.RepairEntity, 'id'>
  ) }
);


export const UpdateRepairRequestDocument = gql`
    mutation updateRepairRequest($input: UpdateRepairInput!) {
  updateRepairRequest(input: $input) {
    id
  }
}
    `;
export function useUpdateRepairRequestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRepairRequestMutationResponse, UpdateRepairRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRepairRequestMutationResponse, UpdateRepairRequestMutationVariables>(UpdateRepairRequestDocument, options);
      }
export type UpdateRepairRequestMutationHookResult = ReturnType<typeof useUpdateRepairRequestMutation>;
export type UpdateRepairRequestMutationResult = Apollo.MutationResult<UpdateRepairRequestMutationResponse>;
export type UpdateRepairRequestMutationOptions = Apollo.BaseMutationOptions<UpdateRepairRequestMutationResponse, UpdateRepairRequestMutationVariables>;