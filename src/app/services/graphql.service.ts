import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  GET_SERVICE_BY_SLUG,
  GET_SERVICES,
} from '../constants/graphql-queries.constants';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getServices(): Observable<any> {
    return this.apollo.query({
      query: GET_SERVICES,
      fetchPolicy: 'no-cache',
    });
  }

  getServiceBySlug(slug: string): Observable<any> {
    return this.apollo.query({
      query: GET_SERVICE_BY_SLUG,
      variables: { slug },
      fetchPolicy: 'no-cache',
    });
  }
}
