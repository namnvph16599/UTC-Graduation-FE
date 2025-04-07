import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateContactMutationVariables = Types.Exact<{
  input: Types.CreateContactInput;
}>;


export type CreateContactMutationResponse = (
  { __typename?: 'Mutation' }
  & { createContact: (
    { __typename?: 'ContactEntity' }
    & Pick<Types.ContactEntity, 'id'>
  ) }
);


export const CreateContactDocument = gql`
    mutation createContact($input: CreateContactInput!) {
  createContact(input: $input) {
    id
  }
}
    `;
export function useCreateContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateContactMutationResponse, CreateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContactMutationResponse, CreateContactMutationVariables>(CreateContactDocument, options);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = Apollo.MutationResult<CreateContactMutationResponse>;
export type CreateContactMutationOptions = Apollo.BaseMutationOptions<CreateContactMutationResponse, CreateContactMutationVariables>;