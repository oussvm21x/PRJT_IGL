import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log("yacine roh ");
    if (this.myForm.valid) {
      const loginData = {
        username: this.myForm.value.username,
        password: this.myForm.value.password,
      };

      this.http.post('http://127.0.0.1:8000/auth/login', loginData)
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            // Handle successful login here (e.g., navigate to another page)
          },
          error: (error) => {
            console.error('Login failed', error);
            // Handle login error here
          },
        });
    }
  }
}