import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateMotorcycleMutationVariables = Types.Exact<{
  input: Types.CreateMotorcycleInput;
}>;


export type CreateMotorcycleMutationResponse = (
  { __typename?: 'Mutation' }
  & { createMotorcycle: (
    { __typename?: 'MotorcycleEntity' }
    & Pick<Types.MotorcycleEntity, 'id'>
  ) }
);


export const CreateMotorcycleDocument = gql`
    mutation createMotorcycle($input: CreateMotorcycleInput!) {
  createMotorcycle(input: $input) {
    id
  }
}
    `;
export function useCreateMotorcycleMutation(baseOptions?: Apollo.MutationHookOptions<CreateMotorcycleMutationResponse, CreateMotorcycleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMotorcycleMutationResponse, CreateMotorcycleMutationVariables>(CreateMotorcycleDocument, options);
      }
export type CreateMotorcycleMutationHookResult = ReturnType<typeof useCreateMotorcycleMutation>;
export type CreateMotorcycleMutationResult = Apollo.MutationResult<CreateMotorcycleMutationResponse>;
export type CreateMotorcycleMutationOptions = Apollo.BaseMutationOptions<CreateMotorcycleMutationResponse, CreateMotorcycleMutationVariables>;