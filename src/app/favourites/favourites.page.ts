// Imports for Angular, Ionic, router for pagr navigstion snd service to mangage favourites 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites.service';

//defines the page
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FavouritesPage implements OnInit {
  //array to store favourites
  favouriteMovies: any[] = [];

  constructor(
    private favouritesService: FavouritesService,
    private router: Router
  ) {}

  //runs wihen page loads first
  ngOnInit(): void {
    this.loadFavourites();
  }
//runs everytime page opened
  ionViewWillEnter(): void {
    this.loadFavourites();
  }
// Load favourite movies from the service
  loadFavourites(): void {
    this.favouriteMovies = this.favouritesService.getFavourites();
  }
// Navigate to movie details page
 openMovieDetails(movieId: number, event?: Event): void {
  event?.stopPropagation();
  console.log('Favourite details clicked:', movieId);
  this.router.navigate(['/movie-details', movieId]);

}
  // Remove movies from favourites
  removeFavourite(movie: any): void {
    this.favouritesService.removeFromFavourites(movie);
    this.loadFavourites();
  }

  //navagate back home
  goHome(): void {
    this.router.navigate(['/home']);
  }
}