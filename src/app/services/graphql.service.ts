import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  GetFeaturedServicesDocument,
  GetFeaturedServicesQuery,
  GetFeaturedServicesQueryVariables,
  GetServiceBySlugDocument,
  GetServiceBySlugQuery,
  GetServiceBySlugQueryVariables,
  GetServicesDocument,
  GetServicesQuery,
  GetServicesQueryVariables,
  GetVehiclesDocument,
  GetVehiclesQuery,
  GetVehiclesQueryVariables,
} from '../graphql/types/graphql';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getServices(): Observable<ApolloQueryResult<GetServicesQuery>> {
    return this.apollo.query<GetServicesQuery, GetServicesQueryVariables>({
      query: GetServicesDocument,
      fetchPolicy: 'no-cache',
    });
  }

  getServiceBySlug(slug: string): Observable<ApolloQueryResult<GetServiceBySlugQuery>> {
    return this.apollo.query<GetServiceBySlugQuery, GetServiceBySlugQueryVariables>({
      query: GetServiceBySlugDocument,
      variables: { slug },
      fetchPolicy: 'no-cache',
    });
  }

  getFeaturedServices(notIn: number[]): Observable<ApolloQueryResult<GetFeaturedServicesQuery>> {
    return this.apollo.query<GetFeaturedServicesQuery, GetFeaturedServicesQueryVariables>({
      query: GetFeaturedServicesDocument,
      variables: { notIn: notIn.map(String) },
      fetchPolicy: 'no-cache',
    });
  }

  getVehicles(): Observable<ApolloQueryResult<GetVehiclesQuery>> {
    return this.apollo.query<GetVehiclesQuery, GetVehiclesQueryVariables>({
      query: GetVehiclesDocument,
      fetchPolicy: 'no-cache',
    });
  }
}
