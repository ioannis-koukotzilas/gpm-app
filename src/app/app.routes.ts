import { Routes } from '@angular/router';
import { PageHomeComponent } from './views/page/page-home/page-home.component';
import { ServiceListComponent } from './views/service/service-list/service-list.component';
import { ServiceDetailComponent } from './views/service/service-detail/service-detail.component';
import { VehicleListComponent } from './views/vehicle/vehicle-list/vehicle-list.component';
import { AboutComponent } from './views/page/about/about.component';
import { ContactComponent } from './views/page/contact/contact.component';
import { TermsAndConditionsComponent } from './views/page/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './views/page/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'service/:slug', component: ServiceDetailComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
