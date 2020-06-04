import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { SortByPipe } from './shared/pipes/sort.pipe';
import { ProjectFilterPipe } from './shared/pipes/projectFilter.pipe';
import { ParentTaskPipe } from './shared/pipes/parentTask.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddTaskComponent,
    AddProjectComponent,
    ViewTaskComponent,
    FilterPipe,
    SortByPipe,
    ProjectFilterPipe,
    ParentTaskPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
