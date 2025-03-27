import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateServiceMutationVariables = Types.Exact<{
  args: Types.CreateServiceInput;
}>;


export type CreateServiceMutationResponse = (
  { __typename?: 'Mutation' }
  & { createService: (
    { __typename?: 'ServicesEntity' }
    & Pick<Types.ServicesEntity, 'id'>
  ) }
);


export const CreateServiceDocument = gql`
    mutation createService($args: CreateServiceInput!) {
  createService(args: $args) {
    id
  }
}
    `;
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutationResponse, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutationResponse, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutationResponse>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutationResponse, CreateServiceMutationVariables>;