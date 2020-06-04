import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  {
    path : 'AddUser',
    component : AddUserComponent,
  },
  {
    path : 'AddTask',
    component : AddTaskComponent,
  },
  {
    path : 'AddProject',
    component : AddProjectComponent,
  },
  {
    path : 'ViewTask',
    component : ViewTaskComponent,
  },
  {
    path : '',
    redirectTo : '/AddUser',
    pathMatch : 'full' ,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
