import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { GraphqlService } from '../../../services/graphql.service';
import { take } from 'rxjs';
import { FeaturedImage, Service } from '../../../model/service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../spinner/spinner.component';

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

  constructor(
    private graphqlService: GraphqlService,
    private cd: ChangeDetectorRef
  ) {}

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
        next: (response: any) => {
          this.initServices(response.data);
          this.setLoading(false);
        },
        error: (error) => {
          console.error('Error:', error);
          this.setLoading(false);
        },
      });
  }

  private initServices(data: any): void {
    data.services.nodes.forEach((node: any) => {
      let featuredImage = null;

      if (node.featuredImage) {
        featuredImage = new FeaturedImage(
          node.featuredImage.node.srcSet,
          node.featuredImage.node.altText
        );
      }

      this.services.push(
        new Service(node.slug, node.title, node.content, featuredImage)
      );
    });
  }
}
