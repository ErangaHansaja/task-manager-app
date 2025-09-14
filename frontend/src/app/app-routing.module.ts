import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default to login
  { path: 'login', /* component: LoginComponent */ }, // Uncomment and add import later
  { path: 'register', /* component: RegisterComponent */ }, // Uncomment and add import later
  { path: 'dashboard', /* component: DashboardComponent, */ canActivate: [AuthGuard] }, // Uncomment component later
  { path: '**', redirectTo: '/login' } // Wildcard to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
