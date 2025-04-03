import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveNewsMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RemoveNewsMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removeNews'>
);


export const RemoveNewsDocument = gql`
    mutation removeNews($id: String!) {
  removeNews(id: $id)
}
    `;
export function useRemoveNewsMutation(baseOptions?: Apollo.MutationHookOptions<RemoveNewsMutationResponse, RemoveNewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveNewsMutationResponse, RemoveNewsMutationVariables>(RemoveNewsDocument, options);
      }
export type RemoveNewsMutationHookResult = ReturnType<typeof useRemoveNewsMutation>;
export type RemoveNewsMutationResult = Apollo.MutationResult<RemoveNewsMutationResponse>;
export type RemoveNewsMutationOptions = Apollo.BaseMutationOptions<RemoveNewsMutationResponse, RemoveNewsMutationVariables>;