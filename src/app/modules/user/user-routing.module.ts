import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersListComponent } from './components/users-list/users-list.component';


const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: {
      title: 'corporativos'
    }
  },
  {
    path: 'detalle/:id',
    component: UserEditComponent,
    data: {
      title: 'Detalles'
    }
  
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
