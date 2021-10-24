import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { UserServicesService } from '../../services/user-services.service';
import * as moment from "moment";
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  private destructorSuscripcion = new Subject();

  title = 'angular-datatables';
  model: NgbDateStruct;
  dataRickMorty : object[]=[];
  dataDetail:object | null;
  rows:any;

  constructor( private _userService : UserServicesService, public router: Router,) { }
  ngOnInit() {
    this.getCorporativo();
  }

  getCorporativo(){
    this._userService.getCorporativos().subscribe((data) => {
      this.rows = data.data;
      //console.log(this.rows);
    })
  }

  getCoporativoById(item){
    console.log(item);
    this.router.navigate(["corporativos/detalle", item.id]);
  }

  ngOnDestroy(): void {
    this.destructorSuscripcion.next();
  }
}
