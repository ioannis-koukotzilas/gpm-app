import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';
import { AppRouteStrategy } from './route-strategy/app-route.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: RouteReuseStrategy,
      useClass: AppRouteStrategy,
    },
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),

    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({ uri: environment.graphqlUrl }),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
