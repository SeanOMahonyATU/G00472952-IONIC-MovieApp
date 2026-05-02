import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { home, heart, heartOutline } from 'ionicons/icons';
import { TmdbService } from '../services/tmdb.service';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    NgFor,
    NgIf
  ]
})
export class MovieDetailsPage implements OnInit {
  movie: any = null;
  cast: any[] = [];
  crew: any[] = [];
  isFavourite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdbService: TmdbService,
    private favouritesService: FavouritesService
  ) {
    addIcons({ home, heart, heartOutline });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.loadMovie(id);
      this.loadCredits(id);
    }
  }

  loadMovie(id: number): void {
    this.tmdbService.getMovieDetails(id).subscribe({
      next: (response: any) => {
        this.movie = response;
        this.isFavourite = this.favouritesService.isFavourite(this.movie);
      },
      error: (error) => {
        console.error('Movie details error:', error);
      }
    });
  }

  loadCredits(id: number): void {
    this.tmdbService.getMovieCredits(id).subscribe({
      next: (response: any) => {
        this.cast = response.cast || [];
        this.crew = response.crew || [];
      },
      error: (error) => {
        console.error('Movie credits error:', error);
      }
    });
  }

  toggleFavourite(): void {
    if (!this.movie) return;

    this.favouritesService.toggleFavourite(this.movie);
    this.isFavourite = this.favouritesService.isFavourite(this.movie);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  openFavourites(): void {
    this.router.navigate(['/favourites']);
  }
  openPersonDetails(personId: number): void {
  this.router.navigate(['/person-details', personId]);
}
}