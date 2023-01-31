import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declare the API Url that provides the data for the client app
const API_URL = 'https://myflix-movie-api.onrender.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject HttpClient module to the constructor params, to provide it to the entire class, using this.http
  constructor(private http: HttpClient) { }

  // Make the api call for the user registration endpoint
  /**
   * @service POST to API endpoint to register a new user
   * @param {any} userDetails
   * @returns a new user object in json format or an error object
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http
      .post(API_URL + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service POST to API endpoint to login a user
   * @param {any} userDetails
   * @returns an user object in json format or an error object
   * @function userLogin
   */
  public userLogin(userDetails: any): Observable<any> {
    //  console.log(userDetails);
    return this.http
      .post(API_URL + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Send a request to the server to get all movies
  /**
   * @service GET request to API endpoint to get all movies
   * @returns an array of all movies in json format or an error object
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(API_URL + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service GET request to the API endpoint to get single movie details
   * @params {string} title
   * @returns an array of movies objects in json format or an error 
   * @funtion getSingleMovies
   */
  getSingleMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${API_URL}movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service GET request to the API endpoint to get director details
   * @params {string} directorName
   * @returns an array of movies objects in json format or an error 
   * @funtion getDirector
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${API_URL}movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service GET request to the API endpoint to get genre details
   * @params {string} genreName
   * @returns an array of movies objects in json format or an error 
   * @funtion getGenre
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${API_URL}movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(`${API_URL}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(`${API_URL}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.favoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * @service Post to the API endpoint to add a movie to user's favourites list
   * @returns an user object in json format or an error 
   * @funtion addFavoriteMovie
   */
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(`${API_URL}users/${username}/movies/${movieId}`,
        { favoriteMovie: movieId }, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service PUT to the API endpoint to update user details
   * @returns an user object in json format or an error 
   * @funtion updateUser
   */
  updateUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(`${API_URL}users/${username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service DELETE to the API endpoint to delete a user 
   * @returns an user object in json format or an error 
   * @funtion deleteUser
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(`${API_URL}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service DELETE to the API endpoint to remove a movie from user's favourites list
   * @returns an user object in json format or an error 
   * @funtion removeFavoriteMovie
   */
  removeFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(`${API_URL}users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }







  // Non-typed response extraction
  /**
   * Extract response data from HTTP request
   * @param res
   * @returns res body or an empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Somme error occured:', error.error.message);
    } else {
      console.error(`Error Status Code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
