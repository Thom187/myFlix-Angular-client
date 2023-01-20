import { Component, OnInit, Input } from '@angular/core';
// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// To import the endpoint API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// To display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: '' };

  constructor(
    private router: Router,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  // Send form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.username)
      this.router.navigate(['movies']);
      // Close modal on success
      this.dialogRef.close();
      this.snackBar.open(`Welcome ${result.user.username}!`, 'OK', {
        duration: 3000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 3000
      });
    });
  }
}
