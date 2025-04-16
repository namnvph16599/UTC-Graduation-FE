import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetActiveBannersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetActiveBannersQueryResponse = (
  { __typename?: 'Query' }
  & { getActiveBanners: Array<(
    { __typename?: 'BannerEntity' }
    & Pick<Types.BannerEntity, 'image' | 'priority_number'>
  )> }
);


export const GetActiveBannersDocument = gql`
    query getActiveBanners {
  getActiveBanners {
    image
    priority_number
  }
}
    `;
export function useGetActiveBannersQuery(baseOptions?: Apollo.QueryHookOptions<GetActiveBannersQueryResponse, GetActiveBannersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveBannersQueryResponse, GetActiveBannersQueryVariables>(GetActiveBannersDocument, options);
      }
export function useGetActiveBannersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveBannersQueryResponse, GetActiveBannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveBannersQueryResponse, GetActiveBannersQueryVariables>(GetActiveBannersDocument, options);
        }
export type GetActiveBannersQueryHookResult = ReturnType<typeof useGetActiveBannersQuery>;
export type GetActiveBannersLazyQueryHookResult = ReturnType<typeof useGetActiveBannersLazyQuery>;
export type GetActiveBannersQueryResult = Apollo.QueryResult<GetActiveBannersQueryResponse, GetActiveBannersQueryVariables>;