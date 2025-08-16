import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isLoading: boolean = false;

  errorMsg: string = '';
  succesMsg: string = '';
  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);

  registerForm : FormGroup = new FormGroup({

    name : new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
    rePassword : new FormControl(null, [Validators.required]),
    phone : new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators: this.confirmPassword});


  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    
    if(password === rePassword) {
      return null; // Passwords match
    }else{
      return {mismatch:true}; // Passwords do not match
    }
  }


  submitForm(){
   
    if(this.registerForm.valid) {
       this.isLoading = true;
      this.authservice.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.errorMsg = '';
          console.log(res);
          this.succesMsg = res.message;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err.error.message);

          this.errorMsg =err.error.message;
          //error msg
        }
      });
    }else {
     this.registerForm.markAllAsTouched();
  }
  } 

}
