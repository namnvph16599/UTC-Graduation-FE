import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContactQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type ContactQueryResponse = (
  { __typename?: 'Query' }
  & { contact: (
    { __typename?: 'ContactEntity' }
    & Pick<Types.ContactEntity, 'content' | 'email' | 'id' | 'name' | 'note' | 'phone' | 'status'>
  ) }
);


export const ContactDocument = gql`
    query contact($id: String!) {
  contact(id: $id) {
    content
    email
    id
    name
    note
    phone
    status
  }
}
    `;
export function useContactQuery(baseOptions: Apollo.QueryHookOptions<ContactQueryResponse, ContactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactQueryResponse, ContactQueryVariables>(ContactDocument, options);
      }
export function useContactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactQueryResponse, ContactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactQueryResponse, ContactQueryVariables>(ContactDocument, options);
        }
export type ContactQueryHookResult = ReturnType<typeof useContactQuery>;
export type ContactLazyQueryHookResult = ReturnType<typeof useContactLazyQuery>;
export type ContactQueryResult = Apollo.QueryResult<ContactQueryResponse, ContactQueryVariables>;