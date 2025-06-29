import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../../model/service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import { PlatformService } from '../../../services/platform.service';

@Component({
  selector: 'app-service-featured',
  imports: [CommonModule, RouterLink],
  templateUrl: './service-featured.component.html',
  styleUrl: './service-featured.component.css',
})
export class ServiceFeaturedComponent implements AfterViewInit {
  @Input() services: Service[] = [];

  @ViewChild('swiperRef') swiperRef!: ElementRef<HTMLElement>;

  constructor(private platformService: PlatformService) {}

  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this.initSwiper();
    }
  }

  private initSwiper(): Swiper {
    return new Swiper(this.swiperRef.nativeElement, {
      modules: [Navigation],
      slidesPerView: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
