import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveBannerMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RemoveBannerMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removeBanner'>
);


export const RemoveBannerDocument = gql`
    mutation removeBanner($id: String!) {
  removeBanner(id: $id)
}
    `;
export function useRemoveBannerMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBannerMutationResponse, RemoveBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBannerMutationResponse, RemoveBannerMutationVariables>(RemoveBannerDocument, options);
      }
export type RemoveBannerMutationHookResult = ReturnType<typeof useRemoveBannerMutation>;
export type RemoveBannerMutationResult = Apollo.MutationResult<RemoveBannerMutationResponse>;
export type RemoveBannerMutationOptions = Apollo.BaseMutationOptions<RemoveBannerMutationResponse, RemoveBannerMutationVariables>;