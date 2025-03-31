import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveUserByAdminMutationVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type RemoveUserByAdminMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removeUserByAdmin'>
);


export const RemoveUserByAdminDocument = gql`
    mutation removeUserByAdmin($userId: String!) {
  removeUserByAdmin(userId: $userId)
}
    `;
export function useRemoveUserByAdminMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserByAdminMutationResponse, RemoveUserByAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserByAdminMutationResponse, RemoveUserByAdminMutationVariables>(RemoveUserByAdminDocument, options);
      }
export type RemoveUserByAdminMutationHookResult = ReturnType<typeof useRemoveUserByAdminMutation>;
export type RemoveUserByAdminMutationResult = Apollo.MutationResult<RemoveUserByAdminMutationResponse>;
export type RemoveUserByAdminMutationOptions = Apollo.BaseMutationOptions<RemoveUserByAdminMutationResponse, RemoveUserByAdminMutationVariables>;