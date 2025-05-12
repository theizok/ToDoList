import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service/api.service';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  imports:[CommonModule]
})
export class CardsComponent implements OnInit {

  dataList: any[] = [];
  constructor(private apiService: ApiService) { }



  ngOnInit(): void {
    this.apiService.get().subscribe(
      (data) => {
        this.dataList = data;
      }, (error) => {
        console.error('Error al obtener las tareas', error);
      }
    );


  }

  getState(state: boolean): string {
    return state ? 'Finalizada' : 'En proceso';
  }

  delete(id: number)
  {
    this.apiService.delete(id).subscribe(() => {
      this.dataList = this.dataList.filter(t => t.id !== id);
    }, (error) => {
      console.error("Error eliminando la tarea", error)
    })
  }

  endAssignment(tarea: any, id: number) {
    const actualizada = { ...tarea, state: true };

    this.apiService.update(actualizada, id).subscribe(() => {
      tarea.state = true; 
    }, error => {
      console.error('Error finalizando tarea', error);
    });
  }


}
