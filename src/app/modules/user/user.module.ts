import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserServicesService } from './services/user-services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersListComponent, UserEditComponent,],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[ UserServicesService]
})
export class UserModule { }
