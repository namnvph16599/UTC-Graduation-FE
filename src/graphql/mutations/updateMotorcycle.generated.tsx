import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateMotorcycleMutationVariables = Types.Exact<{
  input: Types.UpdateMotorcycleInput;
}>;


export type UpdateMotorcycleMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateMotorcycle: (
    { __typename?: 'MotorcycleEntity' }
    & Pick<Types.MotorcycleEntity, 'id'>
  ) }
);


export const UpdateMotorcycleDocument = gql`
    mutation updateMotorcycle($input: UpdateMotorcycleInput!) {
  updateMotorcycle(input: $input) {
    id
  }
}
    `;
export function useUpdateMotorcycleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMotorcycleMutationResponse, UpdateMotorcycleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMotorcycleMutationResponse, UpdateMotorcycleMutationVariables>(UpdateMotorcycleDocument, options);
      }
export type UpdateMotorcycleMutationHookResult = ReturnType<typeof useUpdateMotorcycleMutation>;
export type UpdateMotorcycleMutationResult = Apollo.MutationResult<UpdateMotorcycleMutationResponse>;
export type UpdateMotorcycleMutationOptions = Apollo.BaseMutationOptions<UpdateMotorcycleMutationResponse, UpdateMotorcycleMutationVariables>;