import { Routes } from '@angular/router';

//  app routes
export const routes: Routes = [
  {
    // Home page
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    // movie-details page
    path: 'movie-details/:id',
    loadComponent: () => import('./movie-details/movie-details.page').then((m) => m.MovieDetailsPage),
  },
 
{
  // Favourites page
  path: 'favourites',
  loadComponent: () => import('./favourites/favourites.page').then(m => m.FavouritesPage),
},
{
  // Person-details page 
  path: 'person-details/:id',
  loadComponent: () => import('./person-details/person-details.page').then(m => m.PersonDetailsPage),
},
  {
    // Default route
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];