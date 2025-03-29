import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateBrandMutationVariables = Types.Exact<{
  args: Types.CreateBrandInput;
}>;


export type CreateBrandMutationResponse = (
  { __typename?: 'Mutation' }
  & { createBrand: (
    { __typename?: 'BrandEntity' }
    & Pick<Types.BrandEntity, 'id'>
  ) }
);


export const CreateBrandDocument = gql`
    mutation createBrand($args: CreateBrandInput!) {
  createBrand(args: $args) {
    id
  }
}
    `;
export function useCreateBrandMutation(baseOptions?: Apollo.MutationHookOptions<CreateBrandMutationResponse, CreateBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBrandMutationResponse, CreateBrandMutationVariables>(CreateBrandDocument, options);
      }
export type CreateBrandMutationHookResult = ReturnType<typeof useCreateBrandMutation>;
export type CreateBrandMutationResult = Apollo.MutationResult<CreateBrandMutationResponse>;
export type CreateBrandMutationOptions = Apollo.BaseMutationOptions<CreateBrandMutationResponse, CreateBrandMutationVariables>;