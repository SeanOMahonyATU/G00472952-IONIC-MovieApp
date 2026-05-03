// Imports angular, router and ionic
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonInput,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Import icons
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
// Import TMDB service to get movie data
import { TmdbService } from '../services/tmdb.service';
//import spinner component
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonItem,
    IonInput,
    IonCard,
    IonCardContent,
    IonSpinner, 
    NgFor,
    NgIf,
    FormsModule,
    RouterLink
  ],
})
export class HomePage implements OnInit {

  //show loading spinner
  loading: boolean = true;
  //array to store movies
  movies: any[] = [];
  searchText: string = '';
  pageTitle: string = "Today's Trending Movies";

  constructor(
    private tmdbService: TmdbService,
    private router: Router
  ) {
    // Add heart for favourites button
    addIcons({ heart });
  }

  ngOnInit(): void {
    this.loadTrendingMovies();
  }
// Load trending movies from API
  loadTrendingMovies(): void {
    this.loading = true;
    this.pageTitle = "Today's Trending Movies";

    this.tmdbService.getTrendingMovies().subscribe({
      next: (response: any) => {
        // Store movies from API response
        this.movies = response.results || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('TMDB error:', error);
        this.loading = false;
      }
    });
  }
 // Search for movies based on user input
  onSearch(): void {
    const query = this.searchText.trim();

    if (!query) {
      this.loadTrendingMovies();
      return;
    }

    this.loading = true;
    this.pageTitle = `${query} Movies`;

    this.tmdbService.searchMovies(query).subscribe({
      next: (response: any) => {
        this.movies = response.results || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.loading = false;
      }
    });
  }
// Navigate to favourites page
  openFavourites(): void {
    this.router.navigate(['/favourites']);
  }
   // Clears search and reloads trending movies
  clearSearch(): void {
  this.searchText = '';
  this.loadTrendingMovies();
}
}