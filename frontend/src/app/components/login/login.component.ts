import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const loginData = this.myForm.value;

      this.http.post('http://127.0.0.1:8000/auth/login', loginData)
        .subscribe({
          next: (response: any) => {
            console.log('Login successful', response);

            // Save tokens and user data
            localStorage.setItem('accessToken', response.access_token);
            localStorage.setItem('refreshToken', response.refresh_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('additionalData', JSON.stringify(response.additional_data));

            // Route based on user role
            const userRole = response.user.role;
            switch (userRole) {
              case 'patient':
                // this.router.navigate(['/patient-dashboard']);
                break;
              case 'medecin':
                // this.router.navigate(['/doctor-dashboard']);
                break;
              case 'infirmier':
                // this.router.navigate(['/nurse-dashboard']);
                break;
              case 'laborantien':
                // this.router.navigate(['/lab-dashboard']);
                break;
              default:
                // this.router.navigate(['/default-dashboard']);
            }
          },
          error: (error) => {
            console.error('Login failed', error);
          },
        });
    }
  }
}
