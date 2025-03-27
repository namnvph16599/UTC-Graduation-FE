import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQueryResponse = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'UserEntity' }
    & Pick<Types.UserEntity, 'email' | 'fullName' | 'id' | 'phoneNumber' | 'phonePrefix' | 'status' | 'type' | 'username' | 'uuid'>
  )> }
);


export const MeDocument = gql`
    query me {
  me {
    email
    fullName
    id
    phoneNumber
    phonePrefix
    status
    type
    username
    uuid
  }
}
    `;
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQueryResponse, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQueryResponse, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQueryResponse, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQueryResponse, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQueryResponse, MeQueryVariables>;