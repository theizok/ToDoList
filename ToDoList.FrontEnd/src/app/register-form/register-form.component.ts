import { Component } from '@angular/core';
import { ApiService } from '../services/api-service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterFormComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  register() {

    const user = {
      email: this.email,
      password: this.password
    }

    this.apiService.register(user).subscribe((response: any) => {
      alert("Usuario Registrado");
      this.router.navigate(['/login'])
    },
      (error) => {
        console.error("Error al registrarse");
        this.errorMessage = 'Error al registrarse';
      }
    )
  }
}
