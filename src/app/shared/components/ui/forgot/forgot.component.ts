import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotService } from '../../../../core/services/forgot/forgot.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {

  private readonly forgotService = inject(ForgotService);
  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  step: number = 1;

  forgotPassForm:FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required])
  });

  verifyCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl(null, [Validators.required])
  });

  resetPassForm:FormGroup = new FormGroup({
     email:new FormControl(null, [Validators.required]),
     newPassword:new FormControl(null, [Validators.required])

  });


  onForgotPassword(){
     this.isLoading = true;
    this.forgotService.forgotPass(this.forgotPassForm.value).subscribe({
      next: (res) => {
         this.isLoading = false;
        console.log(res);
        if(res.statusMsg =='success'){
          this.step = 2;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }



  verifyCode(){
     this.isLoading = true;
    this.forgotService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        if(res.status =='success'){
          this.step = 3;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }



  resetPassword(){

    let emailValue = this.forgotPassForm.get('email')?.value;

    this.resetPassForm.get('email')?.patchValue(emailValue);


    this.isLoading = true;
    this.forgotService.resetPass(this.resetPassForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);

          localStorage.setItem('myToken', res.token);

          // Decode the token to get the user data
          this.authservice.getUserData();

          // Redirect to home page
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);


      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

}
