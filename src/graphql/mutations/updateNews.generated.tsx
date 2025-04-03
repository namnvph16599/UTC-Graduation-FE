import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNewsMutationVariables = Types.Exact<{
  input: Types.UpdateNewsInput;
}>;


export type UpdateNewsMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateNews: (
    { __typename?: 'NewsEntity' }
    & Pick<Types.NewsEntity, 'id'>
  ) }
);


export const UpdateNewsDocument = gql`
    mutation updateNews($input: UpdateNewsInput!) {
  updateNews(input: $input) {
    id
  }
}
    `;
export function useUpdateNewsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNewsMutationResponse, UpdateNewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNewsMutationResponse, UpdateNewsMutationVariables>(UpdateNewsDocument, options);
      }
export type UpdateNewsMutationHookResult = ReturnType<typeof useUpdateNewsMutation>;
export type UpdateNewsMutationResult = Apollo.MutationResult<UpdateNewsMutationResponse>;
export type UpdateNewsMutationOptions = Apollo.BaseMutationOptions<UpdateNewsMutationResponse, UpdateNewsMutationVariables>;