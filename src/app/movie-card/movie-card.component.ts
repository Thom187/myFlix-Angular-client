import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Fetch movies via API Call
   * @returns array of objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //  console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens SynopsisComponent as a dialog
   * @param {string} title - movie.title
   * @param {string} description - movie.description
   * @function openSynopsisDialog
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        title: title,
        description: description,
      }
    });
  }

  /**
   * Opens directorComponent as a dialog
   * @param {string} name - director.name 
   * @param {string} bio - director.bio
   * @param {string} birthday - director.birthday 
   * @function openDirectorDialog
   */
  openDirectorDialog(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        name: name,
        bio: bio,
        birthday: birthday
      }
    });
  }

  /**
   * Opens genre.Component as a dialog
   * @param {string} name - genre.name
   * @param {string} description - genre.description
   * @function openGenreDialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        name: name,
        description: description
      }
    });
  }

  /**
   * Fetch User's favourite movies via API Call
   * @returns array of objects
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.favoriteMovies;
      //   console.log(this.favorites);
    });
  }

  /**
   * Adds a movie to a User's favourite movies via API Call
   * @params {string} movieId
   * @function addFavorite
   */
  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * Removes a movie from a User's favourite movies via API Call
   * @params {string} movieId
   * @function removeFavorite
   */
  removeFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }


  /**
   * Checks if movie is a User's favourite movie
   * @params {string} movieId
   * @returns boolean
   * @function isFavoriteMovie
   */
  isFavoriteMovie(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.isFavoriteMovie(movieId)) {
      this.removeFavorite(movieId);
    } else {
      this.addFavorite(movieId);
    }
  }

}
