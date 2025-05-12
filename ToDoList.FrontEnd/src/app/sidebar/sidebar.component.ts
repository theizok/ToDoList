import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports:[RouterModule]
})
export class SidebarComponent {

  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }

}
