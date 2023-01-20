import { Component, OnInit, Input } from '@angular/core';
// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// To import the endpoint API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// Display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  // Send form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful registration --> to be implemented!
      // Close modal on success
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('Registration successful! Please login.', 'OK', {
        duration: 3000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 3000
      });
    });
  }

}
