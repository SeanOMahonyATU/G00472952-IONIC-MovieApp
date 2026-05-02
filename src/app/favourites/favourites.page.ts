import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FavouritesPage implements OnInit {
  favouriteMovies: any[] = [];

  constructor(
    private favouritesService: FavouritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavourites();
  }

  ionViewWillEnter(): void {
    this.loadFavourites();
  }

  loadFavourites(): void {
    this.favouriteMovies = this.favouritesService.getFavourites();
  }

  openMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  removeFavourite(movie: any): void {
    this.favouritesService.removeFromFavourites(movie);
    this.loadFavourites();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}