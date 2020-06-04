import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/Project';
import { Task } from '../shared/models/Task';
import { TaskService } from '../shared/services/task.service';
import { ProjectService } from '../shared/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  projectDetails: Project[]=[];
  taskDetails: Task[]=[];
  editDisable  = [false,false,false,false,false,false,false,false,false];

  constructor(private taskService: TaskService, private projectService: ProjectService,private router:Router) { 
    
   
  }

  ngOnInit() {
  	this.getProjectDetails();
    this.getTaskDetails();
  }

  getProjectDetails(): void{
   this.projectService.getProjectDeatils()
  .subscribe(projects => this.projectDetails = projects)
  }

  getTaskDetails():void{
    this.taskService.getTaskDetails()
    .subscribe(tasks => {
      this.taskDetails = tasks;   
    tasks.forEach((element, index) => {
      if(element.status === 'COMPLETED') {
        this.disablebutton(index);
      }
    });
    });
  }

  deletetask(task: Task): void{
    this.taskDetails = this.taskDetails.filter(u => u !== task);
    this.taskService.deleteTask(task.taskId).subscribe();
  }

  updateTaskDetails(task: Task): void{
    this.taskService.task = task;
    this.taskService.editTaskFlag = true;
    this.router.navigate(['/AddTask']);
  }

  endTask(task: Task): void{
  
    this.taskService.endTask(task).subscribe(data => {
   
      this.getTaskDetails();
    });
   
  }

  disablebutton(index : number) {
    console.log(index);
    this.editDisable[index] = true;
  }

  getTasksByProjectId(id: number): void{
    this.taskService.getTasksByProjectId(id)
    .subscribe(tasks => this.taskDetails = tasks)
  }
  
  sortByPriority(): void{
    this.taskDetails.sort((a, b) => {
       if (a.priority < b.priority) return -1;
       else if (a.priority > b.priority) return 1;
       else return 0;
     });
 } 

  sortByStartDate(): void{
     this.taskDetails.sort((a, b) => {
        if (a.startDate < b.startDate) return -1;
        else if (a.startDate > b.startDate) return 1;
        else return 0;
      });
  }

  sortByEndDate(): void{
     this.taskDetails.sort((a, b) => {
        if (a.endDate < b.endDate) return -1;
        else if (a.endDate > b.endDate) return 1;
        else return 0;
      });
  }

  sortByCompleted(): void{
     this.taskDetails.sort((a, b) => {
        if (a.status < b.status) return -1;
        else if (a.status > b.status) return 1;
        else return 0;
      });
  }

}
