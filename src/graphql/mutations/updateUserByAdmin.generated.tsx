import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserByAdminMutationVariables = Types.Exact<{
  input: Types.UpdateUserByAdminInput;
}>;


export type UpdateUserByAdminMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateUserByAdmin: (
    { __typename?: 'UserEntity' }
    & Pick<Types.UserEntity, 'id'>
  ) }
);


export const UpdateUserByAdminDocument = gql`
    mutation updateUserByAdmin($input: UpdateUserByAdminInput!) {
  updateUserByAdmin(input: $input) {
    id
  }
}
    `;
export function useUpdateUserByAdminMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserByAdminMutationResponse, UpdateUserByAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserByAdminMutationResponse, UpdateUserByAdminMutationVariables>(UpdateUserByAdminDocument, options);
      }
export type UpdateUserByAdminMutationHookResult = ReturnType<typeof useUpdateUserByAdminMutation>;
export type UpdateUserByAdminMutationResult = Apollo.MutationResult<UpdateUserByAdminMutationResponse>;
export type UpdateUserByAdminMutationOptions = Apollo.BaseMutationOptions<UpdateUserByAdminMutationResponse, UpdateUserByAdminMutationVariables>;