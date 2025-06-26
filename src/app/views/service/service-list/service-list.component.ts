import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../../services/graphql.service';
import { map, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ApolloQueryResult } from '@apollo/client/core';
import { GetServicesQuery } from '../../../graphql/types/graphql';
import { Service } from '../../../model/service';
import { FeaturedImage } from '../../../model/featuredImage';

@Component({
  selector: 'app-service-list',
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];

  loading = false;

  constructor(private graphqlService: GraphqlService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getServices();
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.cd.markForCheck();
  }

  private getServices(): void {
    this.setLoading(true);

    this.graphqlService
      .getServices()
      .pipe(take(1))
      .subscribe({
        next: (result: ApolloQueryResult<GetServicesQuery>) => {
          this.initServices(result.data);
          this.setLoading(false);
        },
        error: (error) => {
          console.error('Error:', error);
          this.setLoading(false);
        },
      });
  }

  private initServices(data: GetServicesQuery): void {
    this.services = [];

    if (!data.services?.nodes) {
      return;
    }

    data.services.nodes.forEach((service) => {
      let serviceFeaturedImage = null;

      if (service.featuredImage) {
        serviceFeaturedImage = new FeaturedImage(service.featuredImage.node.srcSet, service.featuredImage.node.altText);
      }

      this.services.push(new Service(service.slug, service.title, service.content, serviceFeaturedImage));
    });
  }
}
