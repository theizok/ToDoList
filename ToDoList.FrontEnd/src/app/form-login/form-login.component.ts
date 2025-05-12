import { Component } from '@angular/core';
import { ApiService } from '../services/api-service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  standalone: true,
  styleUrls: ['./form-login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class FormLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  login() {
    this.apiService.login(this.email, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('jwt', response.token);

        this.router.navigate(['/home/tareas']);
      },
      (error) => {
        this.errorMessage = 'Credenciales inválidas';
      }
    );
  }
}
