import { Component } from '@angular/core';
import { ApiService } from '../services/api-service/api.service'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-form',
  standalone: true,
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
  imports: [CommonModule, FormsModule]
})
export class AddFormComponent {
  name: string = '';
  description: string = '';

  constructor(private apiService: ApiService,private router: Router) { }

  add() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No hay token JWT disponible.');
      this.router.navigate(['/login']);
      return;
    }

    const assignment = {
      name: this.name,
      description: this.description,
      isCompleted: false
    };

    this.apiService.add(assignment).subscribe(
      (response: any) => {
        this.router.navigate(['/tareas']);
      },
      (error) => {
        console.error('Error al crear tarea:', error);
      }
    );
  }


}
