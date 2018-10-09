import {Routes,RouterModule} from '@angular/router';

import {ContentComponent} from './Admin/layout/content/content.component';
import {UsersComponent} from './Admin/users/users.component';
import {MenusComponent} from './Admin/menus/menus.component';
import {CategoriesComponent} from './Admin/categories/categories.component';
import {ItemsComponent} from './Admin/items/items.component';
import {LoginComponent} from './Admin/login/login.component';
import {DashboardComponent} from './Admin/dashboard/dashboard.component';
import {AuthGuard} from './auth/auth.guard';
import { AdduserComponent } from './Admin/users/adduser/adduser.component';

const appRoute : Routes = [
     //Site routes goes here 
    {
         path : '',
         component : ContentComponent,
         children : [
            {path: '', component: DashboardComponent, pathMatch: 'full', canActivate : [AuthGuard]},
            {path: 'users',component: UsersComponent, canActivate : [AuthGuard]},
            {path: 'users/add', component: AdduserComponent,canActivate : [AuthGuard]},
            {path: 'users/edit/:id', component: AdduserComponent,canActivate : [AuthGuard]},
            {path: 'menus', component: MenusComponent, canActivate : [AuthGuard]},
            {path: 'categories', component: CategoriesComponent, canActivate : [AuthGuard]},
            {path: 'items', component: ItemsComponent, canActivate : [AuthGuard]}
         ]
    },
    {path: 'login',component : LoginComponent},
     // otherwise redirect to home
    { path: '**', redirectTo: '' }

]
export const routing = RouterModule.forRoot(appRoute);