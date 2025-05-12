import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './form-login/form-login.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { AddFormComponent } from './add-form/add-form.component';
import { RegisterFormComponent } from './register-form/register-form.component'

export const routes: Routes = [
  { path: 'login', component: FormLoginComponent },
  { path: 'register', component: RegisterFormComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: 'tareas', component: CardsComponent },
      { path: 'add', component: AddFormComponent },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
