import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  @Input() updatedUser = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Fetch User data via API Call
   * @returns object with user data
   * @function getUserInfo
   */
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.username = this.user.username;
      this.updatedUser.email = this.user.email;
      this.updatedUser.birthday = this.user.birthday;
    });
  }

  /**
 * Update User data 
 * @function updateUserInfo
  */
  updateUserInfo(): void {
    this.fetchApiData.updateUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Update was successful', 'OK', {
        duration: 3000,
      });
      if (this.user.username !== result.username) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Update was successful. Please login again!', 'OK', {
          duration: 4000
        });
      }
    });
  }

  /**
    * Delete User that is currently logged in
    * @function deleteProfile
   */
  deleteProfile(): void {
    if (confirm('Are you sure? This will delete your account permanently!')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'Your Profile was deleted successful. We hope to see you again soon!', 'OK', {
          duration: 4000
        }
        )
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }
}

