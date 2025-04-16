import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateBannerMutationVariables = Types.Exact<{
  args: Types.CreateBannerInput;
}>;


export type CreateBannerMutationResponse = (
  { __typename?: 'Mutation' }
  & { createBanner: (
    { __typename?: 'BannerEntity' }
    & Pick<Types.BannerEntity, 'id'>
  ) }
);


export const CreateBannerDocument = gql`
    mutation createBanner($args: CreateBannerInput!) {
  createBanner(args: $args) {
    id
  }
}
    `;
export function useCreateBannerMutation(baseOptions?: Apollo.MutationHookOptions<CreateBannerMutationResponse, CreateBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBannerMutationResponse, CreateBannerMutationVariables>(CreateBannerDocument, options);
      }
export type CreateBannerMutationHookResult = ReturnType<typeof useCreateBannerMutation>;
export type CreateBannerMutationResult = Apollo.MutationResult<CreateBannerMutationResponse>;
export type CreateBannerMutationOptions = Apollo.BaseMutationOptions<CreateBannerMutationResponse, CreateBannerMutationVariables>;