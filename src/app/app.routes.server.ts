import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'services', renderMode: RenderMode.Server },
  { path: 'service/:slug', renderMode: RenderMode.Server },
  { path: 'vehicles', renderMode: RenderMode.Server },
  { path: 'about', renderMode: RenderMode.Server },
  { path: 'contact', renderMode: RenderMode.Server },
  { path: 'terms-and-conditions', renderMode: RenderMode.Server },
  { path: 'privacy-policy', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
