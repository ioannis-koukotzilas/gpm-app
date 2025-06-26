import { Routes } from '@angular/router';
import { PageHomeComponent } from './views/page/page-home/page-home.component';
import { ServiceListComponent } from './views/service/service-list/service-list.component';
import { ServiceDetailComponent } from './views/service/service-detail/service-detail.component';
import { VehicleListComponent } from './views/vehicle/vehicle-list/vehicle-list.component';

export const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'service/:slug', component: ServiceDetailComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
