import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormGroupName, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginData: any = {};
  login_form: FormGroup;
  submitted : Boolean = false;
  constructor(private fb:FormBuilder, private authentication:AuthenticationService,private router:Router) { 
    this.login_form = this.fb.group({
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',Validators.required],
    });
  }
  
  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.login_form.controls; }

  signin ()
  {
   this.submitted = true;
    if(this.login_form.invalid)
    {
      return ;
    }

    this.authentication.login(this.loginData).subscribe(response => {
     console.log(response);
      localStorage.setItem('user',JSON.stringify(response));
      this.router.navigate(['/users']);
    });
    //console.log(this.loginData);
  }
}
