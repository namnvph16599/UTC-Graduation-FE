import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBannerMutationVariables = Types.Exact<{
  args: Types.UpdateBannerInput;
}>;


export type UpdateBannerMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateBanner: (
    { __typename?: 'BannerEntity' }
    & Pick<Types.BannerEntity, 'id'>
  ) }
);


export const UpdateBannerDocument = gql`
    mutation updateBanner($args: UpdateBannerInput!) {
  updateBanner(args: $args) {
    id
  }
}
    `;
export function useUpdateBannerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBannerMutationResponse, UpdateBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBannerMutationResponse, UpdateBannerMutationVariables>(UpdateBannerDocument, options);
      }
export type UpdateBannerMutationHookResult = ReturnType<typeof useUpdateBannerMutation>;
export type UpdateBannerMutationResult = Apollo.MutationResult<UpdateBannerMutationResponse>;
export type UpdateBannerMutationOptions = Apollo.BaseMutationOptions<UpdateBannerMutationResponse, UpdateBannerMutationVariables>;