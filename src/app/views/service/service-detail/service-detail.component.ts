import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FeaturedImage, Service } from '../../../model/service';
import { GraphqlService } from '../../../services/graphql.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-service-detail',
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css',
})
export class ServiceDetailComponent implements OnInit {
  service?: Service;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphqlService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkRouteParams();
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.cd.markForCheck();
  }

  private checkRouteParams(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      const slug = params['slug'];
      this.getServiceBySlug(slug);
    });
  }

  private getServiceBySlug(slug: string): void {
    this.setLoading(true);

    this.graphqlService
      .getServiceBySlug(slug)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.initService(response.data);
          this.setLoading(false);
        },
        error: (error) => {
          console.error('Error:', error);
          this.setLoading(false);
        },
      });
  }

  private initService(data: any): void {
    let featuredImage = null;

    if (data.service.featuredImage) {
      featuredImage = new FeaturedImage(
        data.service.featuredImage.node.srcSet,
        data.service.featuredImage.node.altText
      );
    }

    this.service = new Service(
      data.service.slug,
      data.service.title,
      data.service.content,
      featuredImage
    );
  }
}
