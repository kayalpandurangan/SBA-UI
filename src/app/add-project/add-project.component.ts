import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../shared/models/User';
import { Project } from '../shared/models/Project';
import { UserService } from '../shared/services/user.service';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projectdetails: Project[]=[];
  projectobj: Object ={};
  users: User[]=[];
  
  successMessage : String ="Project Added Successfully";
  successMessageFlag:boolean = true;
 
  updateMessage : String ="Project Updated Successfully";
  updateMessageFlag:boolean = true;
 
  addprojectForm: FormGroup; 
  updateProjectFlag: boolean = false;
  startDate : any;

  enableDate: boolean = false;

  constructor(private userService: UserService,private projectService: ProjectService) { 
    this.startDate = new Date();
  }

  ngOnInit() {
    this.getProjectDeatils();
  	this.getUserDetails();
    
  }

  getUserDetails(): void {
    this.userService.getUserDetails()
    .subscribe(userdata => this.users = userdata)
  }

  addProject(project: Project): void{
    console.log(project);
  	this.projectService.createProject(project)
      .subscribe(project => {
        this.projectdetails.push(project);   
        document.documentElement.scrollTop = 0;
        this.successMessageFlag=false;
        this.getProjectDeatils();
      });
      setTimeout(() => {
        this.successMessageFlag = true;
      }, 2000);
  }

  getProjectDeatils(): void{
    this.projectService.getProjectDeatils()
   .subscribe(projects => this.projectdetails = projects)
 }

  editProject(project: Project): void{
    this.updateProjectFlag = true;
    this.projectobj = project;
    document.documentElement.scrollTop = 50;//Ie
  }

  onSubmit(project: Project): void{
    console.log(this.updateProjectFlag);
    if(this.updateProjectFlag){
      this.updateProjectFlag = false;
      this.projectdetails = this.projectdetails.filter(p => p !== project);
      this.projectService.updateProject(project).subscribe(
        project => {this.projectdetails.push(project);
          document.documentElement.scrollTop = 0;
          this.updateMessageFlag=false;
        });
        setTimeout(() => {
          this.updateMessageFlag = true;
        }, 2000);
    }else{
      this.addProject(project);
    }
  }

  deleteProject(project: Project): void{
    this.projectdetails = this.projectdetails.filter(p => p !== project);
    this.projectService.deleteProject(project.projectId).subscribe();
  }


   changeEvent(event: boolean): void{
    this.enableDate = event;
  }


  sortByPriority(): void{
     this.projectdetails.sort((a, b) => {
        if (a.priority < b.priority) return -1;
        else if (a.priority > b.priority) return 1;
        else return 0;
      });
  }

  sortByStartDate(): void{
    this.projectdetails.sort((a, b) => {
       if (a.startDate < b.startDate) return -1;
       else if (a.startDate > b.startDate) return 1;
       else return 0;
     });
 }

 sortByEndDate(): void{
  this.projectdetails.sort((a, b) => {
     if (a.endDate < b.endDate) return -1;
     else if (a.endDate > b.endDate) return 1;
     else return 0;
   });
}

  sortByCompleted(): void{
     /*this.projectdetails.sort((a, b) => {
        if (a.status < b.status) return -1;
        else if (a.status > b.status) return 1;
        else return 0;
      });*/
  }

}
