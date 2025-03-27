import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateServiceMutationVariables = Types.Exact<{
  args: Types.UpdateServiceInput;
}>;


export type UpdateServiceMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateService: (
    { __typename?: 'ServicesEntity' }
    & Pick<Types.ServicesEntity, 'id'>
  ) }
);


export const UpdateServiceDocument = gql`
    mutation updateService($args: UpdateServiceInput!) {
  updateService(args: $args) {
    id
  }
}
    `;
export function useUpdateServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceMutationResponse, UpdateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceMutationResponse, UpdateServiceMutationVariables>(UpdateServiceDocument, options);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = Apollo.MutationResult<UpdateServiceMutationResponse>;
export type UpdateServiceMutationOptions = Apollo.BaseMutationOptions<UpdateServiceMutationResponse, UpdateServiceMutationVariables>;