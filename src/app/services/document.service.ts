import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { CssClass, formatCssClass } from '../enum/cssClass';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  addBodyClass(cssClasses: CssClass[]): void {
    cssClasses.forEach((cssClass) => {
      this.document.body.classList.add(formatCssClass(cssClass));
    });
  }

  removeBodyClass(cssClasses: CssClass[]): void {
    cssClasses.forEach((cssClass) => {
      this.document.body.classList.remove(formatCssClass(cssClass));
    });
  }
}
