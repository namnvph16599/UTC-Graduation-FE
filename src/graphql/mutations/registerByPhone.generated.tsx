import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RegisterByPhoneMutationVariables = Types.Exact<{
  input: Types.RegisterByPhoneInput;
}>;


export type RegisterByPhoneMutationResponse = (
  { __typename?: 'Mutation' }
  & { registerByPhone: (
    { __typename?: 'UserEntity' }
    & Pick<Types.UserEntity, 'uuid'>
  ) }
);


export const RegisterByPhoneDocument = gql`
    mutation registerByPhone($input: RegisterByPhoneInput!) {
  registerByPhone(input: $input) {
    uuid
  }
}
    `;
export function useRegisterByPhoneMutation(baseOptions?: Apollo.MutationHookOptions<RegisterByPhoneMutationResponse, RegisterByPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterByPhoneMutationResponse, RegisterByPhoneMutationVariables>(RegisterByPhoneDocument, options);
      }
export type RegisterByPhoneMutationHookResult = ReturnType<typeof useRegisterByPhoneMutation>;
export type RegisterByPhoneMutationResult = Apollo.MutationResult<RegisterByPhoneMutationResponse>;
export type RegisterByPhoneMutationOptions = Apollo.BaseMutationOptions<RegisterByPhoneMutationResponse, RegisterByPhoneMutationVariables>;