import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserInformationMutationVariables = Types.Exact<{
  input: Types.UpdateUserInformationInput;
}>;


export type UpdateUserInformationMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateUserInformation: (
    { __typename?: 'UserEntity' }
    & Pick<Types.UserEntity, 'id'>
  ) }
);


export const UpdateUserInformationDocument = gql`
    mutation updateUserInformation($input: UpdateUserInformationInput!) {
  updateUserInformation(input: $input) {
    id
  }
}
    `;
export function useUpdateUserInformationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInformationMutationResponse, UpdateUserInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInformationMutationResponse, UpdateUserInformationMutationVariables>(UpdateUserInformationDocument, options);
      }
export type UpdateUserInformationMutationHookResult = ReturnType<typeof useUpdateUserInformationMutation>;
export type UpdateUserInformationMutationResult = Apollo.MutationResult<UpdateUserInformationMutationResponse>;
export type UpdateUserInformationMutationOptions = Apollo.BaseMutationOptions<UpdateUserInformationMutationResponse, UpdateUserInformationMutationVariables>;