//import angular,HttpClient for API
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Make service available 
@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  // API key for TMDB
  private apiKey = '22d80a296e73cd54e02b8bf48841119e';
  // Base URL for TMDB API
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Get today trending movies
  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`
    );
  }
// Search movies by name
  searchMovies(query: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/search/movie?query=${encodeURIComponent(query)}&api_key=${this.apiKey}`
    );
  }

  // details for a movie
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`
    );
  }
// cast and crew for a movie
  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`
    );
  }
  // Get details of actor/crew
  getPersonDetails(personId: number) {
  return this.http.get(`${this.baseUrl}/person/${personId}?api_key=${this.apiKey}`);
}
// cast history
getPersonMovieCredits(personId: number) {
  return this.http.get(`${this.baseUrl}/person/${personId}/movie_credits?api_key=${this.apiKey}`);
}
}