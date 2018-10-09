import { Component, OnInit } from "@angular/core";
import { Users } from "../../Classes/users";
import { UsersService } from "../../Services/users.service";
import swal from 'sweetalert2';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  data : any= [];
  constructor(private user : UsersService) {}
  
  ngOnInit() {
    this.getusers();
  }

  getusers()
  {
    this.user.getUsers().subscribe(response => {
      this.data  = response['users']['user'];
    },error => {
      console.log(error);
    });
  }

  delete(id:any)
  {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.user.deleteUser(id).subscribe(response => {
          swal(
            'Deleted!',
            'Your user has been deleted.',
            'success'
          )
          this.getusers();
        });
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  edit(id:any)
  {

  }
}
