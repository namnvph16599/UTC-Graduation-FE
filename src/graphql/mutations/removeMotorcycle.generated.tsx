import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveMotorcycleMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RemoveMotorcycleMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removeMotorcycle'>
);


export const RemoveMotorcycleDocument = gql`
    mutation removeMotorcycle($id: String!) {
  removeMotorcycle(id: $id)
}
    `;
export function useRemoveMotorcycleMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMotorcycleMutationResponse, RemoveMotorcycleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMotorcycleMutationResponse, RemoveMotorcycleMutationVariables>(RemoveMotorcycleDocument, options);
      }
export type RemoveMotorcycleMutationHookResult = ReturnType<typeof useRemoveMotorcycleMutation>;
export type RemoveMotorcycleMutationResult = Apollo.MutationResult<RemoveMotorcycleMutationResponse>;
export type RemoveMotorcycleMutationOptions = Apollo.BaseMutationOptions<RemoveMotorcycleMutationResponse, RemoveMotorcycleMutationVariables>;