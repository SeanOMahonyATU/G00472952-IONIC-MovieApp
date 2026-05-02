import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'movie-details/:id',
    loadComponent: () => import('./movie-details/movie-details.page').then((m) => m.MovieDetailsPage),
  },
  {
  path: 'person/:id',
  loadComponent: () => import('./person-details/person-details.page').then(m => m.PersonDetailsPage),
},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];