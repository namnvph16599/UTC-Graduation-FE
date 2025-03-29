import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateRepairRequestMutationVariables = Types.Exact<{
  input: Types.CreateRepairInput;
}>;


export type CreateRepairRequestMutationResponse = (
  { __typename?: 'Mutation' }
  & { createRepairRequest: (
    { __typename?: 'RepairEntity' }
    & Pick<Types.RepairEntity, 'id'>
  ) }
);


export const CreateRepairRequestDocument = gql`
    mutation createRepairRequest($input: CreateRepairInput!) {
  createRepairRequest(input: $input) {
    id
  }
}
    `;
export function useCreateRepairRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateRepairRequestMutationResponse, CreateRepairRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRepairRequestMutationResponse, CreateRepairRequestMutationVariables>(CreateRepairRequestDocument, options);
      }
export type CreateRepairRequestMutationHookResult = ReturnType<typeof useCreateRepairRequestMutation>;
export type CreateRepairRequestMutationResult = Apollo.MutationResult<CreateRepairRequestMutationResponse>;
export type CreateRepairRequestMutationOptions = Apollo.BaseMutationOptions<CreateRepairRequestMutationResponse, CreateRepairRequestMutationVariables>;