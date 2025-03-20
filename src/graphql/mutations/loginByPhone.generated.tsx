import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LoginByPhoneMutationVariables = Types.Exact<{
  input: Types.LoginByPhoneInput;
}>;


export type LoginByPhoneMutationResponse = (
  { __typename?: 'Mutation' }
  & { loginByPhone: (
    { __typename?: 'AuthEntity' }
    & Pick<Types.AuthEntity, 'accessToken' | 'expiresAt' | 'id' | 'refreshToken'>
    & { user: (
      { __typename?: 'UserEntity' }
      & Pick<Types.UserEntity, 'email' | 'fullName' | 'id' | 'phoneNumber' | 'phonePrefix' | 'status' | 'type' | 'username' | 'uuid'>
      & { avatar?: Types.Maybe<(
        { __typename?: 'MediaEntity' }
        & Pick<Types.MediaEntity, 'fullUrl'>
      )> }
    ) }
  ) }
);


export const LoginByPhoneDocument = gql`
    mutation loginByPhone($input: LoginByPhoneInput!) {
  loginByPhone(input: $input) {
    accessToken
    expiresAt
    id
    refreshToken
    user {
      avatar {
        fullUrl
      }
      email
      fullName
      id
      phoneNumber
      phonePrefix
      status
      type
      username
      uuid
    }
  }
}
    `;
export function useLoginByPhoneMutation(baseOptions?: Apollo.MutationHookOptions<LoginByPhoneMutationResponse, LoginByPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginByPhoneMutationResponse, LoginByPhoneMutationVariables>(LoginByPhoneDocument, options);
      }
export type LoginByPhoneMutationHookResult = ReturnType<typeof useLoginByPhoneMutation>;
export type LoginByPhoneMutationResult = Apollo.MutationResult<LoginByPhoneMutationResponse>;
export type LoginByPhoneMutationOptions = Apollo.BaseMutationOptions<LoginByPhoneMutationResponse, LoginByPhoneMutationVariables>;