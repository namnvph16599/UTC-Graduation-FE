import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProductMutationVariables = Types.Exact<{
  args: Types.UpdateProductInput;
}>;


export type UpdateProductMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateProduct: (
    { __typename?: 'ProductEntity' }
    & Pick<Types.ProductEntity, 'id'>
  ) }
);


export const UpdateProductDocument = gql`
    mutation updateProduct($args: UpdateProductInput!) {
  updateProduct(args: $args) {
    id
  }
}
    `;
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutationResponse, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutationResponse, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutationResponse>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutationResponse, UpdateProductMutationVariables>;