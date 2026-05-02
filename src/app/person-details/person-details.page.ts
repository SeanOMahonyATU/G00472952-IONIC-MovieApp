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
import { home } from 'ionicons/icons';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
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
export class PersonDetailsPage implements OnInit {
  person: any;
  movieCredits: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdbService: TmdbService
  ) {
    addIcons({ home });
  }

  ngOnInit(): void {
    const personId = Number(this.route.snapshot.paramMap.get('id'));
    if (personId) {
      this.loadPersonDetails(personId);
      this.loadMovieCredits(personId);
    }
  }

  loadPersonDetails(id: number): void {
    this.tmdbService.getPersonDetails(id).subscribe((data: any) => {
      this.person = data;
    });
  }

  loadMovieCredits(id: number): void {
    this.tmdbService.getPersonMovieCredits(id).subscribe((data: any) => {
      this.movieCredits = data.cast || [];
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  openMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}