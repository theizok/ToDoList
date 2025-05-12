import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'ToDoList.FrontEnd';
}
