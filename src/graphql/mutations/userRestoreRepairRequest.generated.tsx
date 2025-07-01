import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserRestoreRepairRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type UserRestoreRepairRequestMutationResponse = (
  { __typename?: 'Mutation' }
  & { userRestoreRepairRequest: (
    { __typename?: 'RepairEntity' }
    & Pick<Types.RepairEntity, 'id'>
  ) }
);


export const UserRestoreRepairRequestDocument = gql`
    mutation userRestoreRepairRequest($id: String!) {
  userRestoreRepairRequest(id: $id) {
    id
  }
}
    `;
export function useUserRestoreRepairRequestMutation(baseOptions?: Apollo.MutationHookOptions<UserRestoreRepairRequestMutationResponse, UserRestoreRepairRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserRestoreRepairRequestMutationResponse, UserRestoreRepairRequestMutationVariables>(UserRestoreRepairRequestDocument, options);
      }
export type UserRestoreRepairRequestMutationHookResult = ReturnType<typeof useUserRestoreRepairRequestMutation>;
export type UserRestoreRepairRequestMutationResult = Apollo.MutationResult<UserRestoreRepairRequestMutationResponse>;
export type UserRestoreRepairRequestMutationOptions = Apollo.BaseMutationOptions<UserRestoreRepairRequestMutationResponse, UserRestoreRepairRequestMutationVariables>;