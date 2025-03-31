import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserCollectionByAdminQueryVariables = Types.Exact<{
  filterArgs?: Types.InputMaybe<Types.UserCollectionFilter>;
  paginationArgs?: Types.InputMaybe<Types.PaginationArgs>;
}>;


export type UserCollectionByAdminQueryResponse = (
  { __typename?: 'Query' }
  & { userCollectionByAdmin: (
    { __typename?: 'UserConnection' }
    & { items: Array<(
      { __typename?: 'UserEntity' }
      & Pick<Types.UserEntity, 'email' | 'fullName' | 'id' | 'phoneNumber' | 'phonePrefix' | 'status' | 'type' | 'uuid'>
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const UserCollectionByAdminDocument = gql`
    query userCollectionByAdmin($filterArgs: UserCollectionFilter, $paginationArgs: PaginationArgs) {
  userCollectionByAdmin(filterArgs: $filterArgs, paginationArgs: $paginationArgs) {
    items {
      email
      fullName
      id
      phoneNumber
      phonePrefix
      status
      type
      uuid
    }
    meta {
      currentPage
      hasNextPage
      hasPreviousPage
      limit
      totalItem
      totalPage
    }
  }
}
    `;
export function useUserCollectionByAdminQuery(baseOptions?: Apollo.QueryHookOptions<UserCollectionByAdminQueryResponse, UserCollectionByAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCollectionByAdminQueryResponse, UserCollectionByAdminQueryVariables>(UserCollectionByAdminDocument, options);
      }
export function useUserCollectionByAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCollectionByAdminQueryResponse, UserCollectionByAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCollectionByAdminQueryResponse, UserCollectionByAdminQueryVariables>(UserCollectionByAdminDocument, options);
        }
export type UserCollectionByAdminQueryHookResult = ReturnType<typeof useUserCollectionByAdminQuery>;
export type UserCollectionByAdminLazyQueryHookResult = ReturnType<typeof useUserCollectionByAdminLazyQuery>;
export type UserCollectionByAdminQueryResult = Apollo.QueryResult<UserCollectionByAdminQueryResponse, UserCollectionByAdminQueryVariables>;