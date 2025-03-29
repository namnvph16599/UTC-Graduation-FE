import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBrandMutationVariables = Types.Exact<{
  args: Types.UpdateBrandInput;
}>;


export type UpdateBrandMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateBrand: (
    { __typename?: 'BrandEntity' }
    & Pick<Types.BrandEntity, 'id'>
  ) }
);


export const UpdateBrandDocument = gql`
    mutation updateBrand($args: UpdateBrandInput!) {
  updateBrand(args: $args) {
    id
  }
}
    `;
export function useUpdateBrandMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBrandMutationResponse, UpdateBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBrandMutationResponse, UpdateBrandMutationVariables>(UpdateBrandDocument, options);
      }
export type UpdateBrandMutationHookResult = ReturnType<typeof useUpdateBrandMutation>;
export type UpdateBrandMutationResult = Apollo.MutationResult<UpdateBrandMutationResponse>;
export type UpdateBrandMutationOptions = Apollo.BaseMutationOptions<UpdateBrandMutationResponse, UpdateBrandMutationVariables>;