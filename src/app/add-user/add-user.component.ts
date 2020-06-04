import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  adduserForm: FormGroup;
  editUserFlag: boolean =false;
  userdetails: User[]=[];
  userobj: Object ={};

  successMessage : String ="User Added Successfully";
  successMessageFlag:boolean = true;
  updateMessage : String ="User updated Successfully";
  updateMessageFlag:boolean = true;

  constructor(private userService: UserService) {
    }


  ngOnInit() {
    this.getUsers();
  }

  onSubmit(user: User): void{
    console.log(this.editUserFlag);
    if(this.editUserFlag){
      this.editUserFlag = false;
      this.userdetails = this.userdetails.filter(u => u !== user);
      this.userService.updateUser(user).subscribe(
        user => {this.userdetails.push(user);
          document.documentElement.scrollTop = 0;
        this.updateMessageFlag=false;
        });
        setTimeout(() => {
          this.updateMessageFlag = true;
        }, 2000);
    }else{
      this.addUser(user);
    }
  }

  addUser(user: User): void{
    this.userService.addUser(user)
      .subscribe(user => {
        this.userdetails.push(user);
        document.documentElement.scrollTop = 0;
        this.successMessageFlag=false;
      });
      setTimeout(() => {
        this.successMessageFlag = true;
      }, 2000);
  }
   
  getUsers(): void {
    this.userService.getUserDetails()
    .subscribe(users => this.userdetails = users)
  }

 
  updateUser(user: User): void{
    document.documentElement.scrollTop = 0;//Ie
    this.editUserFlag = true;
    this.userobj = user;  
    // window.scrollTo(0,0);
    // window.scroll({
    //   top: 10,
    //   left: 0,
    //   behavior: 'smooth'
    // });
   
  }
  

  deleteUser(user: User): void{
    console.log("userdeatils deleted ");
    this.userdetails = this.userdetails.filter(u => u !== user);
    this.userService.deleteUser(user.userId).subscribe();
  }

  sortById(): void{
    this.userdetails.sort((a, b) => { 
       if (a.userId < b.userId) return -1;
       else if (a.userId > b.userId) return 1;
       else return 0;
     });
 }

  sortByFirstName(): void{
     this.userdetails.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        else if (a.firstName > b.firstName) return 1;
        else return 0;
      });
  }

  sortByLastName(): void{
     this.userdetails.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        else if (a.lastName > b.lastName) return 1;
        else return 0;
      });
  }

  

}
