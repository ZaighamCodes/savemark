import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  auth=inject(Auth);
  private router=inject(Router);

  logoutUser() {
    this.auth.logoutUser().subscribe({
      next: (response) => {
        console.log('response from server', response);
        this.auth.currentUser = null;
        this.router.navigate(['/login']);
        
      },
      error: (error) => {
        console.log('error from server', error);
         // For test
      this.auth.currentUser = null;
      this.router.navigate(['/login']);
      },
    });
  }
}
