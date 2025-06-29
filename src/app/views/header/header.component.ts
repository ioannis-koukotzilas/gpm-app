import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { CssClass } from '../../enum/cssClass';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private documentService: DocumentService, private platformService: PlatformService) {}

  ngOnInit(): void {
    if (this.platformService.isBrowser) {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    if (window.scrollY > 50) {
      this.documentService.addBodyClass([CssClass.WindowScrolled]);
    } else {
      this.documentService.removeBodyClass([CssClass.WindowScrolled]);
    }
  }
}
