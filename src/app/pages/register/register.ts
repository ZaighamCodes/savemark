import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
@Component({
  selector: 'register',
  imports: [FormsModule,],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

// initialiazing the component
export class RegisterComponent implements OnInit {
  // 2. Implement it

  constructor() {}
  isLoading: boolean = false;
  username = '';
  password = '';
  confirmPassword = '';
  private auth = inject(Auth);
  private router = inject(Router);
  ngOnInit(): void {
    console.log('Component has loaded!');
  }

  registerUser(form: NgForm) {
    if (!this.username || !this.password) {
      alert('All fields are mandatory');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      this.password = '';
      this.confirmPassword = '';
      return;
    }
    if (this.username.length < 5) {
      alert('Username should be at least 5 characters long');

      return;
    }
    if (this.password.length < 8) {
      alert('Password should be at least 8 characters long');
      this.password = '';
      this.confirmPassword = '';
      return;
    }
    this.isLoading = true;
    this.auth.registerUser({ username: this.username, password: this.password })
    .pipe(
      finalize(()=>
      {
        this.isLoading=false;
      })
    )
    .subscribe({
      next: (response) => {
        console.log('response from server', response);
        alert('user registered successfully');
        this.router.navigate(['/login']);
        // form.resetForm();
      },
      error: (error) => {
        console.log('error from server', error);
        alert('Something went wrong');
      },
    });
  }
}
