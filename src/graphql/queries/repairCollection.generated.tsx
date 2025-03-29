import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RepairCollectionQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.RepairCollectionFilter>;
  pagination?: Types.InputMaybe<Types.PaginationArgs>;
}>;


export type RepairCollectionQueryResponse = (
  { __typename?: 'Query' }
  & { repairCollection: (
    { __typename?: 'RepairConnection' }
    & { items: Array<(
      { __typename?: 'RepairEntity' }
      & Pick<Types.RepairEntity, 'cancelled_description' | 'capacity' | 'createdAt' | 'deletedAt' | 'description' | 'description_of_customer' | 'discount_percent' | 'estimated_delivery_time' | 'expected_receiving_time' | 'id' | 'license_plate' | 'manufacture_year' | 'name' | 'phone' | 'status' | 'updatedAt'>
      & { model?: Types.Maybe<(
        { __typename?: 'ModelEntity' }
        & Pick<Types.ModelEntity, 'name'>
        & { brand?: Types.Maybe<(
          { __typename?: 'BrandEntity' }
          & Pick<Types.BrandEntity, 'name'>
        )> }
      )>, products: Array<(
        { __typename?: 'RepairM2MProductEntity' }
        & Pick<Types.RepairM2MProductEntity, 'id' | 'price'>
        & { product: (
          { __typename?: 'ProductEntity' }
          & Pick<Types.ProductEntity, 'name'>
        ) }
      )>, services: Array<(
        { __typename?: 'RepairM2MServiceEntity' }
        & Pick<Types.RepairM2MServiceEntity, 'id' | 'price'>
        & { service: (
          { __typename?: 'ServicesEntity' }
          & Pick<Types.ServicesEntity, 'name'>
        ) }
      )> }
    )>, meta: (
      { __typename?: 'PageMeta' }
      & Pick<Types.PageMeta, 'currentPage' | 'hasNextPage' | 'hasPreviousPage' | 'limit' | 'totalItem' | 'totalPage'>
    ) }
  ) }
);


export const RepairCollectionDocument = gql`
    query repairCollection($input: RepairCollectionFilter, $pagination: PaginationArgs) {
  repairCollection(input: $input, pagination: $pagination) {
    items {
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
        name
        brand {
          name
        }
      }
      name
      phone
      products {
        id
        price
        product {
          name
        }
      }
      services {
        id
        price
        service {
          name
        }
      }
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
export function useRepairCollectionQuery(baseOptions?: Apollo.QueryHookOptions<RepairCollectionQueryResponse, RepairCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepairCollectionQueryResponse, RepairCollectionQueryVariables>(RepairCollectionDocument, options);
      }
export function useRepairCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepairCollectionQueryResponse, RepairCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepairCollectionQueryResponse, RepairCollectionQueryVariables>(RepairCollectionDocument, options);
        }
export type RepairCollectionQueryHookResult = ReturnType<typeof useRepairCollectionQuery>;
export type RepairCollectionLazyQueryHookResult = ReturnType<typeof useRepairCollectionLazyQuery>;
export type RepairCollectionQueryResult = Apollo.QueryResult<RepairCollectionQueryResponse, RepairCollectionQueryVariables>;