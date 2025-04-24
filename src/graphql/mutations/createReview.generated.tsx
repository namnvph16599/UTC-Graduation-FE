import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateReviewMutationVariables = Types.Exact<{
  input: Types.UserCreateReviewInput;
}>;


export type CreateReviewMutationResponse = (
  { __typename?: 'Mutation' }
  & { createReview: (
    { __typename?: 'ReviewEntity' }
    & Pick<Types.ReviewEntity, 'id'>
  ) }
);


export const CreateReviewDocument = gql`
    mutation createReview($input: UserCreateReviewInput!) {
  createReview(input: $input) {
    id
  }
}
    `;
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutationResponse, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutationResponse, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutationResponse>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutationResponse, CreateReviewMutationVariables>;