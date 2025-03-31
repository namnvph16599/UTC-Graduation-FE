import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserByAdminMutationVariables = Types.Exact<{
  input: Types.CreateUserByAdminInput;
}>;


export type CreateUserByAdminMutationResponse = (
  { __typename?: 'Mutation' }
  & { createUserByAdmin: (
    { __typename?: 'UserEntity' }
    & Pick<Types.UserEntity, 'id'>
  ) }
);


export const CreateUserByAdminDocument = gql`
    mutation createUserByAdmin($input: CreateUserByAdminInput!) {
  createUserByAdmin(input: $input) {
    id
  }
}
    `;
export function useCreateUserByAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserByAdminMutationResponse, CreateUserByAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserByAdminMutationResponse, CreateUserByAdminMutationVariables>(CreateUserByAdminDocument, options);
      }
export type CreateUserByAdminMutationHookResult = ReturnType<typeof useCreateUserByAdminMutation>;
export type CreateUserByAdminMutationResult = Apollo.MutationResult<CreateUserByAdminMutationResponse>;
export type CreateUserByAdminMutationOptions = Apollo.BaseMutationOptions<CreateUserByAdminMutationResponse, CreateUserByAdminMutationVariables>;