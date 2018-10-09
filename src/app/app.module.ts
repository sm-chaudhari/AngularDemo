import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Admin/layout/header/header.component";
import { FooterComponent } from "./Admin/layout/footer/footer.component";
import { ContentComponent } from "./Admin/layout/content/content.component";
import { UsersComponent } from "./Admin/users/users.component";
import { MenusComponent } from "./Admin/menus/menus.component";
import { CategoriesComponent } from "./Admin/categories/categories.component";
import { ItemsComponent } from "./Admin/items/items.component";
import { routing } from "./app.routing";
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LoginComponent } from './Admin/login/login.component';
// import {DataTableModule} from "angular-6-datatable";
import {HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { AdduserComponent } from './Admin/users/adduser/adduser.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    UsersComponent,
    MenusComponent,
    CategoriesComponent,
    ItemsComponent,
    DashboardComponent,
    LoginComponent,
    AdduserComponent
    
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, routing,HttpClientModule,DataTablesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
