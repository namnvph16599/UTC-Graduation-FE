import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RepairQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RepairQueryResponse = (
  { __typename?: 'Query' }
  & { repair: (
    { __typename?: 'RepairEntity' }
    & Pick<Types.RepairEntity, 'cancelBy' | 'total' | 'cancelled_description' | 'capacity' | 'createdAt' | 'deletedAt' | 'description' | 'description_of_customer' | 'discount_percent' | 'estimated_delivery_time' | 'expected_receiving_time' | 'id' | 'license_plate' | 'manufacture_year' | 'name' | 'phone' | 'status'>
    & { review?: Types.Maybe<(
      { __typename?: 'ReviewEntity' }
      & Pick<Types.ReviewEntity, 'rating' | 'content' | 'createdAt'>
    )>, model?: Types.Maybe<(
      { __typename?: 'ModelEntity' }
      & Pick<Types.ModelEntity, 'id' | 'name'>
      & { brand?: Types.Maybe<(
        { __typename?: 'BrandEntity' }
        & Pick<Types.BrandEntity, 'id' | 'name'>
      )> }
    )>, products: Array<(
      { __typename?: 'RepairM2MProductEntity' }
      & Pick<Types.RepairM2MProductEntity, 'id' | 'price' | 'quantity'>
      & { product: (
        { __typename?: 'ProductEntity' }
        & Pick<Types.ProductEntity, 'id' | 'name'>
      ) }
    )>, services: Array<(
      { __typename?: 'RepairM2MServiceEntity' }
      & Pick<Types.RepairM2MServiceEntity, 'id' | 'price'>
      & { service: (
        { __typename?: 'ServicesEntity' }
        & Pick<Types.ServicesEntity, 'id' | 'name'>
      ) }
    )>, staff?: Types.Maybe<(
      { __typename?: 'UserEntity' }
      & Pick<Types.UserEntity, 'id' | 'fullName' | 'phoneNumber'>
    )>, statusHistories?: Types.Maybe<Array<(
      { __typename?: 'RepairRequestsStatusHistoryEntity' }
      & Pick<Types.RepairRequestsStatusHistoryEntity, 'createdAt' | 'newStatus' | 'oldStatus'>
    )>> }
  ) }
);


export const RepairDocument = gql`
    query repair($id: String!) {
  repair(id: $id) {
    review {
      rating
      content
      createdAt
    }
    cancelBy
    total
    cancelled_description
    capacity
    createdAt
    deletedAt
    description
    description_of_customer
    discount_percent
    estimated_delivery_time
    expected_receiving_time
    id
    license_plate
    manufacture_year
    model {
      brand {
        id
        name
      }
      id
      name
    }
    name
    phone
    products {
      id
      price
      quantity
      product {
        id
        name
      }
      quantity
    }
    services {
      id
      price
      service {
        id
        name
      }
    }
    staff {
      id
      fullName
      phoneNumber
    }
    status
    statusHistories {
      createdAt
      newStatus
      oldStatus
    }
  }
}
    `;
export function useRepairQuery(baseOptions: Apollo.QueryHookOptions<RepairQueryResponse, RepairQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepairQueryResponse, RepairQueryVariables>(RepairDocument, options);
      }
export function useRepairLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepairQueryResponse, RepairQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepairQueryResponse, RepairQueryVariables>(RepairDocument, options);
        }
export type RepairQueryHookResult = ReturnType<typeof useRepairQuery>;
export type RepairLazyQueryHookResult = ReturnType<typeof useRepairLazyQuery>;
export type RepairQueryResult = Apollo.QueryResult<RepairQueryResponse, RepairQueryVariables>;