import { Component, OnInit } from '@angular/core';
import {FormsModule, FormGroup, FormGroupName, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {UsersService} from '../../../Services/users.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  addUser : FormGroup;
  submitted : Boolean = false;
  result : any = {} ;
  pswd = true;
  title = "Add User";
  mode : Boolean = true;
  constructor(private fb: FormBuilder,private users_service : UsersService,private router : Router,private route: ActivatedRoute) {

    this.addUser = this.fb.group({
      'name' : ['',Validators.required],
      'address' : ['',Validators.required],
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(5)]],
    });

    // get data for edit user
    this.route.params.subscribe(params => 
      {
        this.result =  this.users_service.getUserById(this.route.snapshot.params['id']).subscribe(data => 
        {
          console.log(data['users']['data']);
          if(data['users']['data'])
          {
            this.pswd = false;
            this.title = "Edit User";
            this.mode = false;
            this.result = data['users']['data'];
            this.addUser = this.fb.group({
              'name' : ['',Validators.required],
              'address' : ['',Validators.required],
              'email' : ['',[Validators.required,Validators.email]],
              'password' : ['',null],
            });
          }
        });
      });
   }

  ngOnInit() {
  }

  get f() { return this.addUser.controls; }

  Add()
  {
    this.submitted = true;
    if(this.addUser.invalid)
    {
      return ;
    }

    if(this.mode)
    {
      this.users_service.addUser(this.result).subscribe(response =>{
        alert('Record Inserted Successfully.');
        this.router.navigate(['/users']);
      },(err) => { console.log(err) });
    }
    else
    {
      //console.log(this.result);
      this.users_service.editUser(this.result,this.route.snapshot.params['id']).subscribe(data => {
       alert('Record has been updated successfully!');
        this.router.navigate(['/users']);
      },error => {
        console.log(error);
      })
    }
  }
}
