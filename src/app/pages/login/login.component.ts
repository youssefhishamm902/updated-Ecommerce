import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  isLoading: boolean = false;

  errorMsg: string = '';
  succesMsg: string = '';
  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);

  LoginForm : FormGroup = new FormGroup({

  
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
   
  });



submitForm() {
  if (this.LoginForm.valid) {
    this.isLoading = true;
    this.authservice.signIn(this.LoginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.errorMsg = '';
        console.log(res);

        this.succesMsg = res.message;

        // Check if the token is valid
        if (res.token && typeof res.token === 'string') {
          // Save token in local storage
          localStorage.setItem('myToken', res.token);

          // Decode the token to get the user data
          this.authservice.getUserData();

          // Redirect to home page
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        } else {
          this.errorMsg = 'Invalid token received from the server.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err.error.message);

        this.errorMsg = err.error.message;
      }
    });
  } else {
    this.LoginForm.markAllAsTouched();
  }
}
}
