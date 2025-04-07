import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContactCollectionQueryVariables = Types.Exact<{
  filterArgs?: Types.InputMaybe<Types.ContactCollectionInput>;
  paginationArgs: Types.PaginationArgs;
}>;


export type ContactCollectionQueryResponse = (
  { __typename?: 'Query' }
  & { contactCollection: (
    { __typename?: 'ContactConnection' }
    & { items: Array<(
      { __typename?: 'ContactEntity' }
      & Pick<Types.ContactEntity, 'content' | 'createdAt' | 'email' | 'id' | 'name' | 'note' | 'phone' | 'status' | 'updatedAt'>
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const ContactCollectionDocument = gql`
    query contactCollection($filterArgs: ContactCollectionInput, $paginationArgs: PaginationArgs!) {
  contactCollection(filterArgs: $filterArgs, paginationArgs: $paginationArgs) {
    items {
      content
      createdAt
      email
      id
      name
      note
      phone
      status
      updatedAt
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
export function useContactCollectionQuery(baseOptions: Apollo.QueryHookOptions<ContactCollectionQueryResponse, ContactCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactCollectionQueryResponse, ContactCollectionQueryVariables>(ContactCollectionDocument, options);
      }
export function useContactCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactCollectionQueryResponse, ContactCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactCollectionQueryResponse, ContactCollectionQueryVariables>(ContactCollectionDocument, options);
        }
export type ContactCollectionQueryHookResult = ReturnType<typeof useContactCollectionQuery>;
export type ContactCollectionLazyQueryHookResult = ReturnType<typeof useContactCollectionLazyQuery>;
export type ContactCollectionQueryResult = Apollo.QueryResult<ContactCollectionQueryResponse, ContactCollectionQueryVariables>;