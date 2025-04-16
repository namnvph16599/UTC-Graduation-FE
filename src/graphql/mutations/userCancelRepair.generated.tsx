import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserCancelRepairMutationVariables = Types.Exact<{
  input: Types.CancelRepairInput;
}>;


export type UserCancelRepairMutationResponse = (
  { __typename?: 'Mutation' }
  & { userCancelRepair: (
    { __typename?: 'RepairEntity' }
    & Pick<Types.RepairEntity, 'id'>
  ) }
);


export const UserCancelRepairDocument = gql`
    mutation userCancelRepair($input: CancelRepairInput!) {
  userCancelRepair(input: $input) {
    id
  }
}
    `;
export function useUserCancelRepairMutation(baseOptions?: Apollo.MutationHookOptions<UserCancelRepairMutationResponse, UserCancelRepairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserCancelRepairMutationResponse, UserCancelRepairMutationVariables>(UserCancelRepairDocument, options);
      }
export type UserCancelRepairMutationHookResult = ReturnType<typeof useUserCancelRepairMutation>;
export type UserCancelRepairMutationResult = Apollo.MutationResult<UserCancelRepairMutationResponse>;
export type UserCancelRepairMutationOptions = Apollo.BaseMutationOptions<UserCancelRepairMutationResponse, UserCancelRepairMutationVariables>;