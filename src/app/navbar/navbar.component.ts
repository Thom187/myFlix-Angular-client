import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.user = result;
      return this.user
    });
  }

  /**
   * Navigation to movies page
   * @function toMovies
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigation to User profile 
   * @function toProfile
   */

  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logging out current User, clearing localStorage and navigation to Welcome page
   * @function logOut
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}


