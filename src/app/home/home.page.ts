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
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { TmdbService } from '../services/tmdb.service';

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
  NgFor,
  NgIf,
  FormsModule,
  RouterLink
],
})
export class HomePage implements OnInit {
  movies: any[] = [];
  searchText: string = '';
  pageTitle: string = "Today's Trending Movies";

  constructor(
    private tmdbService: TmdbService,
    private router: Router
  ) {
    addIcons({ heart });
  }

  ngOnInit(): void {
    this.loadTrendingMovies();
  }

  loadTrendingMovies(): void {
    this.pageTitle = "Today's Trending Movies";
    this.tmdbService.getTrendingMovies().subscribe({
      next: (response: any) => {
        this.movies = response.results || [];
      },
      error: (error) => {
        console.error('TMDB error:', error);
      }
    });
  }

  onSearch(): void {
    const query = this.searchText.trim();

    if (!query) {
      this.loadTrendingMovies();
      return;
    }

    this.pageTitle = `${query} Movies`;

    this.tmdbService.searchMovies(query).subscribe({
      next: (response: any) => {
        this.movies = response.results || [];
      },
      error: (error) => {
        console.error('Search error:', error);
      }
    });
  }

  openMovieDetails(movieId: number): void {
    console.log('Clicked movie id:', movieId);
    this.router.navigate(['/movie', movieId]);
  }

  openFavourites(): void {
    console.log('heart clicked');
    this.router.navigate(['/favourites']);
  }
}