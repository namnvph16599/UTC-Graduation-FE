import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ModelsQueryVariables = Types.Exact<{
  args?: Types.InputMaybe<Types.GetModelsRequest>;
}>;


export type ModelsQueryResponse = (
  { __typename?: 'Query' }
  & { models: Array<(
    { __typename?: 'ModelEntity' }
    & Pick<Types.ModelEntity, 'createdAt' | 'deletedAt' | 'id' | 'name' | 'updatedAt'>
    & { brand?: Types.Maybe<(
      { __typename?: 'BrandEntity' }
      & Pick<Types.BrandEntity, 'createdAt' | 'deletedAt' | 'id' | 'name' | 'updatedAt'>
    )> }
  )> }
);


export const ModelsDocument = gql`
    query models($args: GetModelsRequest) {
  models(args: $args) {
    brand {
      createdAt
      deletedAt
      id
      name
      updatedAt
    }
    createdAt
    deletedAt
    id
    name
    updatedAt
  }
}
    `;
export function useModelsQuery(baseOptions?: Apollo.QueryHookOptions<ModelsQueryResponse, ModelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModelsQueryResponse, ModelsQueryVariables>(ModelsDocument, options);
      }
export function useModelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModelsQueryResponse, ModelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModelsQueryResponse, ModelsQueryVariables>(ModelsDocument, options);
        }
export type ModelsQueryHookResult = ReturnType<typeof useModelsQuery>;
export type ModelsLazyQueryHookResult = ReturnType<typeof useModelsLazyQuery>;
export type ModelsQueryResult = Apollo.QueryResult<ModelsQueryResponse, ModelsQueryVariables>;