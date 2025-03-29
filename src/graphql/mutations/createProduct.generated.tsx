import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProductMutationVariables = Types.Exact<{
  args: Types.CreateProductInput;
}>;


export type CreateProductMutationResponse = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'ProductEntity' }
    & Pick<Types.ProductEntity, 'id'>
  ) }
);


export const CreateProductDocument = gql`
    mutation createProduct($args: CreateProductInput!) {
  createProduct(args: $args) {
    id
  }
}
    `;
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutationResponse, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutationResponse, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutationResponse>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutationResponse, CreateProductMutationVariables>;