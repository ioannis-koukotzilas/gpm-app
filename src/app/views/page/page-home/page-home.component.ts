import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ContactCtaComponent } from '../../contact/contact-cta/contact-cta.component';
import { FaqComponent } from '../../faq/faq.component';
import { Service } from '../../../model/service';
import { GraphqlService } from '../../../services/graphql.service';
import { GetServicesQuery } from '../../../graphql/types/graphql';
import { FeaturedImage } from '../../../model/featuredImage';
import { take } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ServiceFeaturedComponent } from '../../service/service-featured/service-featured.component';
import { DocumentService } from '../../../services/document.service';
import { CssClass } from '../../../enum/cssClass';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-home',
  imports: [CommonModule, RouterLink, SpinnerComponent, ServiceFeaturedComponent, ContactCtaComponent, FaqComponent],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHomeComponent implements OnInit, OnDestroy {
  featuredServices: Service[] = [];

  loading = false;

  constructor(private graphqlService: GraphqlService, private documentService: DocumentService, private cd: ChangeDetectorRef) {
    this.documentService.addBodyClass([CssClass.FixedHeader, CssClass.TransparentHeader]);
  }

  ngOnInit(): void {
    this.getFeaturedServices();
  }

  ngOnDestroy(): void {
    this.documentService.removeBodyClass([CssClass.FixedHeader, CssClass.TransparentHeader]);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.cd.markForCheck();
  }

  private getFeaturedServices(): void {
    this.setLoading(true);

    this.graphqlService
      .getServices()
      .pipe(take(1))
      .subscribe({
        next: (result: ApolloQueryResult<GetServicesQuery>) => {
          this.initFeaturedServices(result.data);
          this.setLoading(false);
        },
        error: (error) => {
          console.error('Error:', error);
          this.setLoading(false);
        },
      });
  }

  private initFeaturedServices(data: GetServicesQuery): void {
    if (!data.services?.nodes) {
      return;
    }

    data.services.nodes.forEach((service) => {
      const featuredImage = service.featuredImage ? new FeaturedImage(service.featuredImage.node.srcSet) : null;
      this.featuredServices.push(new Service(service.databaseId, service.slug, service.title, service.excerpt, service.content, featuredImage));
    });
  }
}
