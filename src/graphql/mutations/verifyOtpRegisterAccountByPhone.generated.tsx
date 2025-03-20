import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerifyOtpRegisterAccountByPhoneMutationVariables = Types.Exact<{
  input: Types.VerifyOtpRegisterAccountByPhoneInput;
}>;


export type VerifyOtpRegisterAccountByPhoneMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'verifyOtpRegisterAccountByPhone'>
);


export const VerifyOtpRegisterAccountByPhoneDocument = gql`
    mutation verifyOtpRegisterAccountByPhone($input: VerifyOtpRegisterAccountByPhoneInput!) {
  verifyOtpRegisterAccountByPhone(input: $input)
}
    `;
export function useVerifyOtpRegisterAccountByPhoneMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpRegisterAccountByPhoneMutationResponse, VerifyOtpRegisterAccountByPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpRegisterAccountByPhoneMutationResponse, VerifyOtpRegisterAccountByPhoneMutationVariables>(VerifyOtpRegisterAccountByPhoneDocument, options);
      }
export type VerifyOtpRegisterAccountByPhoneMutationHookResult = ReturnType<typeof useVerifyOtpRegisterAccountByPhoneMutation>;
export type VerifyOtpRegisterAccountByPhoneMutationResult = Apollo.MutationResult<VerifyOtpRegisterAccountByPhoneMutationResponse>;
export type VerifyOtpRegisterAccountByPhoneMutationOptions = Apollo.BaseMutationOptions<VerifyOtpRegisterAccountByPhoneMutationResponse, VerifyOtpRegisterAccountByPhoneMutationVariables>;