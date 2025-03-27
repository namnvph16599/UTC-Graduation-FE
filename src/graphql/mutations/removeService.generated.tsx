import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveServiceMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RemoveServiceMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removeService'>
);


export const RemoveServiceDocument = gql`
    mutation removeService($id: String!) {
  removeService(id: $id)
}
    `;
export function useRemoveServiceMutation(baseOptions?: Apollo.MutationHookOptions<RemoveServiceMutationResponse, RemoveServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveServiceMutationResponse, RemoveServiceMutationVariables>(RemoveServiceDocument, options);
      }
export type RemoveServiceMutationHookResult = ReturnType<typeof useRemoveServiceMutation>;
export type RemoveServiceMutationResult = Apollo.MutationResult<RemoveServiceMutationResponse>;
export type RemoveServiceMutationOptions = Apollo.BaseMutationOptions<RemoveServiceMutationResponse, RemoveServiceMutationVariables>;