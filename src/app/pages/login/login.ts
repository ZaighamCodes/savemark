import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  imports: [RouterLink,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  username = '';
  password = '';
  private auth = inject(Auth);
  private router = inject(Router);
  ngOnInit(): void {
    // console.log('Login component has loaded!');
  }
  loginUser(form:NgForm)
  {
    this.auth.loginUser({ username: this.username, password: this.password }).subscribe({
      next:(response)=>{
        console.log('response from server', response);
        this.router.navigate(['/home']);
      },
      error:(error)=>{
        console.log('error from server', error);
      }
    })
    // console.log('login form submitted',form.value);
  }
}
