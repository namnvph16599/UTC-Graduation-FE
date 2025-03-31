import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetStaffByAdminQueryVariables = Types.Exact<{
  staffId: Types.Scalars['String'];
}>;


export type GetStaffByAdminQueryResponse = (
  { __typename?: 'Query' }
  & { getStaffByAdmin: (
    { __typename?: 'UserEntity' }
    & Pick<Types.UserEntity, 'email' | 'fullName' | 'id' | 'phoneNumber' | 'phonePrefix' | 'status' | 'type'>
  ) }
);


export const GetStaffByAdminDocument = gql`
    query getStaffByAdmin($staffId: String!) {
  getStaffByAdmin(staffId: $staffId) {
    email
    fullName
    id
    phoneNumber
    phonePrefix
    status
    type
  }
}
    `;
export function useGetStaffByAdminQuery(baseOptions: Apollo.QueryHookOptions<GetStaffByAdminQueryResponse, GetStaffByAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStaffByAdminQueryResponse, GetStaffByAdminQueryVariables>(GetStaffByAdminDocument, options);
      }
export function useGetStaffByAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStaffByAdminQueryResponse, GetStaffByAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStaffByAdminQueryResponse, GetStaffByAdminQueryVariables>(GetStaffByAdminDocument, options);
        }
export type GetStaffByAdminQueryHookResult = ReturnType<typeof useGetStaffByAdminQuery>;
export type GetStaffByAdminLazyQueryHookResult = ReturnType<typeof useGetStaffByAdminLazyQuery>;
export type GetStaffByAdminQueryResult = Apollo.QueryResult<GetStaffByAdminQueryResponse, GetStaffByAdminQueryVariables>;