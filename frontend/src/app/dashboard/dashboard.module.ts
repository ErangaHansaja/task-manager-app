import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { SubtaskListComponent } from './subtask-list/subtask-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TaskListComponent,
    TaskCardComponent,
    TaskFormComponent,
    TaskDetailComponent,
    SubtaskListComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
