import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveBrandMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RemoveBrandMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removeBrand'>
);


export const RemoveBrandDocument = gql`
    mutation removeBrand($id: String!) {
  removeBrand(id: $id)
}
    `;
export function useRemoveBrandMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBrandMutationResponse, RemoveBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBrandMutationResponse, RemoveBrandMutationVariables>(RemoveBrandDocument, options);
      }
export type RemoveBrandMutationHookResult = ReturnType<typeof useRemoveBrandMutation>;
export type RemoveBrandMutationResult = Apollo.MutationResult<RemoveBrandMutationResponse>;
export type RemoveBrandMutationOptions = Apollo.BaseMutationOptions<RemoveBrandMutationResponse, RemoveBrandMutationVariables>;