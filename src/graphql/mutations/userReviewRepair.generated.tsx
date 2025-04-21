import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserReviewRepairMutationVariables = Types.Exact<{
  input: Types.UserReviewRepairInput;
}>;


export type UserReviewRepairMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'userReviewRepair'>
);


export const UserReviewRepairDocument = gql`
    mutation userReviewRepair($input: UserReviewRepairInput!) {
  userReviewRepair(input: $input)
}
    `;
export function useUserReviewRepairMutation(baseOptions?: Apollo.MutationHookOptions<UserReviewRepairMutationResponse, UserReviewRepairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserReviewRepairMutationResponse, UserReviewRepairMutationVariables>(UserReviewRepairDocument, options);
      }
export type UserReviewRepairMutationHookResult = ReturnType<typeof useUserReviewRepairMutation>;
export type UserReviewRepairMutationResult = Apollo.MutationResult<UserReviewRepairMutationResponse>;
export type UserReviewRepairMutationOptions = Apollo.BaseMutationOptions<UserReviewRepairMutationResponse, UserReviewRepairMutationVariables>;