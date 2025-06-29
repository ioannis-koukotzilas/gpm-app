import { ChangeDetectorRef, Component } from '@angular/core';
import { Vehicle } from '../../../model/vehicle';
import { GraphqlService } from '../../../services/graphql.service';
import { take } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { GetVehiclesQuery } from '../../../graphql/types/graphql';
import { FeaturedImage } from '../../../model/featuredImage';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ContactCtaComponent } from '../../contact/contact-cta/contact-cta.component';

@Component({
  selector: 'app-vehicle-list',
  imports: [CommonModule, SpinnerComponent, ContactCtaComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css',
})
export class VehicleListComponent {
  vehicles: Vehicle[] = [];

  loading = false;

  constructor(private graphqlService: GraphqlService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.cd.markForCheck();
  }

  private getVehicles(): void {
    this.setLoading(true);

    this.graphqlService
      .getVehicles()
      .pipe(take(1))
      .subscribe({
        next: (result: ApolloQueryResult<GetVehiclesQuery>) => {
          this.initServices(result.data);
          this.setLoading(false);
        },
        error: (error) => {
          console.error('Error:', error);
          this.setLoading(false);
        },
      });
  }

  private initServices(data: GetVehiclesQuery): void {
    this.vehicles = [];

    if (!data.vehicles?.nodes) {
      return;
    }

    data.vehicles.nodes.forEach((vehicle) => {
      let featuredImage = null;

      if (vehicle.featuredImage) {
        featuredImage = new FeaturedImage(vehicle.featuredImage.node.srcSet);
      }

      this.vehicles.push(new Vehicle(vehicle.slug, vehicle.title, featuredImage, vehicle.vehicleFields?.passengerCapacity));
    });
  }
}
