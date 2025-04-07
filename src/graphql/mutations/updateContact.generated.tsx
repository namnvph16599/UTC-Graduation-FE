import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateContactMutationVariables = Types.Exact<{
  input: Types.UpdateContactInput;
}>;


export type UpdateContactMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateContact: (
    { __typename?: 'ContactEntity' }
    & Pick<Types.ContactEntity, 'id'>
  ) }
);


export const UpdateContactDocument = gql`
    mutation updateContact($input: UpdateContactInput!) {
  updateContact(input: $input) {
    id
  }
}
    `;
export function useUpdateContactMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContactMutationResponse, UpdateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContactMutationResponse, UpdateContactMutationVariables>(UpdateContactDocument, options);
      }
export type UpdateContactMutationHookResult = ReturnType<typeof useUpdateContactMutation>;
export type UpdateContactMutationResult = Apollo.MutationResult<UpdateContactMutationResponse>;
export type UpdateContactMutationOptions = Apollo.BaseMutationOptions<UpdateContactMutationResponse, UpdateContactMutationVariables>;