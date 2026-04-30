import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '22d80a296e73cd54e02b8bf48841119e';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`
    );
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/search/movie?query=${encodeURIComponent(query)}&api_key=${this.apiKey}`
    );
  }

  // ➕ Add these methods
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`
    );
  }

  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`
    );
  }
  getPersonDetails(personId: number) {
  return this.http.get(`${this.baseUrl}/person/${personId}?api_key=${this.apiKey}`);
}

getPersonMovieCredits(personId: number) {
  return this.http.get(`${this.baseUrl}/person/${personId}/movie_credits?api_key=${this.apiKey}`);
}
}