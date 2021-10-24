import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "../dashboard/components/dashboard/dashboard.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    
  ],
  providers: [],
})
export class DashboardModule { }
