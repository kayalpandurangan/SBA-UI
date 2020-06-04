import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/User';
import { Project } from '../shared/models/Project';
import { ParentTask } from '../shared/models/Parent-Task';
import { UserService } from '../shared/services/user.service';
import { ProjectService } from '../shared/services/project.service';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/models/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
  projectdetails: Project[]=[];
  parentTasks: ParentTask[]=[];
  userdetails: User[]=[];
  taskobj: Object = {};

  successMessage : String ="Task Added Successfully";
  successMessageFlag:boolean = true;

  updateMessage : String ="Task Updated Successfully";
  updateMessageFlag:boolean = true;

  disable: boolean = false;
  updateTaskFlag : boolean = false;
  

  constructor(private userService: UserService, private projectService: ProjectService, private taskService: TaskService) { 
    
    if(this.taskService.task != null){
      this.taskobj = this.taskService.task;
      this.taskService.task = null;
      this.updateTaskFlag = this.taskService.editTaskFlag;
      this.taskService.editTaskFlag = false;
    }
  }

  ngOnInit() {
      this.getUserDetails();
      this.getProject();
      this.getParentTaskdetails();
  }
  
  changeEvent(event: boolean): void{
    console.log(event);
    this.disable = event;
  }

  getUserDetails(): void {
    this.userService.getUserDetails()
    .subscribe(users => this.userdetails = users)
  }

  createTask(task: Task): void {
   
    this.taskService.createTask(task).subscribe((data) => {
      document.documentElement.scrollTop = 0;
      this.successMessageFlag=false;
    });
    setTimeout(() => {
      this.successMessageFlag = true;
    }, 2000);
  }

  getProject(): void{
    this.projectService.getProjectDeatils()
   .subscribe(projects => this.projectdetails = projects)
   }

   getParentTaskdetails(): void{
    this.taskService.getParentTasks()
    .subscribe(parentTasks => this.parentTasks = parentTasks)
  }

   editTask(task : Task): void {
    this.taskService.updateTask(task).subscribe(()=> {
      document.documentElement.scrollTop = 0;
      this.updateMessageFlag=false;
    });
    setTimeout(() => {
      this.updateMessageFlag = true;
    }, 2000);
    this.updateTaskFlag = false;
  }


}
