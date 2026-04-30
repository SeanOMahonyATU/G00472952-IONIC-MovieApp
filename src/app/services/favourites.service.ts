import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private storageKey = 'favouriteMovies';

  getFavourites(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  isFavourite(movie: any): boolean {
    return this.getFavourites().some(m => m.id === movie.id);
  }

  addToFavourites(movie: any): void {
    const favourites = this.getFavourites();

    if (!this.isFavourite(movie)) {
      favourites.push(movie);
      localStorage.setItem(this.storageKey, JSON.stringify(favourites));
    }
  }

  removeFromFavourites(movie: any): void {
    const favourites = this.getFavourites().filter(m => m.id !== movie.id);
    localStorage.setItem(this.storageKey, JSON.stringify(favourites));
  }

  toggleFavourite(movie: any): void {
    if (this.isFavourite(movie)) {
      this.removeFromFavourites(movie);
    } else {
      this.addToFavourites(movie);
    }
  }
}