import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateNewsMutationVariables = Types.Exact<{
  input: Types.CreateNewsInput;
}>;


export type CreateNewsMutationResponse = (
  { __typename?: 'Mutation' }
  & { createNews: (
    { __typename?: 'NewsEntity' }
    & Pick<Types.NewsEntity, 'id'>
  ) }
);


export const CreateNewsDocument = gql`
    mutation createNews($input: CreateNewsInput!) {
  createNews(input: $input) {
    id
  }
}
    `;
export function useCreateNewsMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewsMutationResponse, CreateNewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewsMutationResponse, CreateNewsMutationVariables>(CreateNewsDocument, options);
      }
export type CreateNewsMutationHookResult = ReturnType<typeof useCreateNewsMutation>;
export type CreateNewsMutationResult = Apollo.MutationResult<CreateNewsMutationResponse>;
export type CreateNewsMutationOptions = Apollo.BaseMutationOptions<CreateNewsMutationResponse, CreateNewsMutationVariables>;