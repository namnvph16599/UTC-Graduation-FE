import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BannerQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type BannerQueryResponse = (
  { __typename?: 'Query' }
  & { banner: (
    { __typename?: 'BannerEntity' }
    & Pick<Types.BannerEntity, 'active' | 'id' | 'image' | 'name' | 'priority_number'>
  ) }
);


export const BannerDocument = gql`
    query banner($id: String!) {
  banner(id: $id) {
    active
    id
    image
    name
    priority_number
  }
}
    `;
export function useBannerQuery(baseOptions: Apollo.QueryHookOptions<BannerQueryResponse, BannerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BannerQueryResponse, BannerQueryVariables>(BannerDocument, options);
      }
export function useBannerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BannerQueryResponse, BannerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BannerQueryResponse, BannerQueryVariables>(BannerDocument, options);
        }
export type BannerQueryHookResult = ReturnType<typeof useBannerQuery>;
export type BannerLazyQueryHookResult = ReturnType<typeof useBannerLazyQuery>;
export type BannerQueryResult = Apollo.QueryResult<BannerQueryResponse, BannerQueryVariables>;