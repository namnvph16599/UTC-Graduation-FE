import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveProductMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RemoveProductMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removeProduct'>
);


export const RemoveProductDocument = gql`
    mutation removeProduct($id: String!) {
  removeProduct(id: $id)
}
    `;
export function useRemoveProductMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProductMutationResponse, RemoveProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProductMutationResponse, RemoveProductMutationVariables>(RemoveProductDocument, options);
      }
export type RemoveProductMutationHookResult = ReturnType<typeof useRemoveProductMutation>;
export type RemoveProductMutationResult = Apollo.MutationResult<RemoveProductMutationResponse>;
export type RemoveProductMutationOptions = Apollo.BaseMutationOptions<RemoveProductMutationResponse, RemoveProductMutationVariables>;