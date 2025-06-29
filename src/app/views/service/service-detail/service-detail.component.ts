import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Service } from '../../../model/service';
import { GraphqlService } from '../../../services/graphql.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { concatMap, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { GetFeaturedServicesQuery, GetServiceBySlugQuery } from '../../../graphql/types/graphql';
import { ApolloQueryResult } from '@apollo/client/core';
import { FeaturedImage } from '../../../model/featuredImage';
import { ServiceFeaturedComponent } from '../service-featured/service-featured.component';
import { DocumentService } from '../../../services/document.service';
import { CssClass } from '../../../enum/cssClass';
import { FaqComponent } from '../../faq/faq.component';
import { ContactCtaComponent } from '../../contact/contact-cta/contact-cta.component';

@Component({
  selector: 'app-service-detail',
  imports: [CommonModule, RouterLink, SpinnerComponent, ContactCtaComponent, ServiceFeaturedComponent, FaqComponent],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css',
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  service!: Service;
  featuredServices: Service[] = [];

  loading = false;

  constructor(private route: ActivatedRoute, private graphqlService: GraphqlService, private documentService: DocumentService, private cd: ChangeDetectorRef) {
    this.documentService.addBodyClass([CssClass.FixedHeader, CssClass.TransparentHeader]);
  }

  ngOnInit(): void {
    this.checkRouteParams();
  }

  ngOnDestroy(): void {
    this.documentService.removeBodyClass([CssClass.FixedHeader, CssClass.TransparentHeader]);
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
      .pipe(
        take(1),

        concatMap((result: ApolloQueryResult<GetServiceBySlugQuery>) => {
          this.initService(result.data);
          return this.graphqlService.getFeaturedServices([this.service?.id]).pipe(take(1));
        }),
        tap((result: ApolloQueryResult<GetFeaturedServicesQuery>) => {
          this.initFeaturedServices(result.data);
        }),
      )
      .subscribe({
        next: () => {
          this.setLoading(false);
        },
        error: (error) => {
          console.error('Error:', error);
          this.setLoading(false);
        },
      });
  }

  private initService(data: GetServiceBySlugQuery): void {
    if (!data.service) {
      return;
    }

    const featuredImage = data.service.featuredImage ? new FeaturedImage(data.service.featuredImage.node.srcSet) : null;
    this.service = new Service(data.service.databaseId, data.service.slug, data.service.title, data.service.excerpt, data.service.content, featuredImage, data.service.serviceFields?.summaryTitle);
  }

  private initFeaturedServices(data: GetFeaturedServicesQuery): void {
    if (!data.services?.nodes) {
      return;
    }

    data.services.nodes.forEach((service) => {
      const featuredImage = service.featuredImage ? new FeaturedImage(service.featuredImage.node.srcSet) : null;
      this.featuredServices.push(new Service(service.databaseId, service.slug, service.title, service.excerpt, service.content, featuredImage));
    });
  }
}
