import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserServicesService } from '../../services/user-services.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  id: any;
  corp: any;
  detailContact:any;
  contactCorp: object[] = [];
  imgCopr: any;
  formCorp: FormGroup;
  formContact: FormGroup;
  saveButton: boolean = false;
  saveButtonLoading: boolean = false;
  constructor(private route: ActivatedRoute, public fb: FormBuilder, private _userService: UserServicesService, private location: Location) { }

  ngOnInit(): void {
    this.getCop();
    this.createContactForm();
  }

  enabledButton() {
    this.formCorp.enable();
    this.saveButton = true;
  }

  getCop(){
    this.id = this.route.snapshot.paramMap.get("id");
    this._userService.getCorporativosById(this.id)
      .subscribe((result: any) => {
        console.log(result.data);
        this.corp = result.data.corporativo;
        this.contactCorp = this.corp.tw_contactos_corporativo;
        this.imgCopr = this.corp.S_LogoURL;
        this.formCorp = this.fb.group({
          name: [this.corp.S_NombreCorto, [Validators.required],],
          nameC: [this.corp.S_NombreCompleto, [Validators.required]],
          imageurl: [this.corp.S_LogoURL, [Validators.required]],
          status: [this.corp.S_Activo, [Validators.required]],
          url: [this.corp.S_SystemUrl, [Validators.required]],
          date: [new Date(this.corp.D_FechaIncorporacion), [Validators.required]],
          asignate: [this.corp.FK_Asignado_id, [Validators.required]]
        })
        this.formCorp.disable();
        //console.log(this.formCorp.value);
      });
  }

  createContactForm(){
    this.formContact = this.fb.group({
      name: ['', [Validators.required],],
      position: ['', [Validators.required],],
      coment: ['', [Validators.required],] || '',
      phone: ['', [Validators.required],],
      mobil: ['', [Validators.required],],
      email: ['', [Validators.required],],
      tw_corporativo_id: ['', [Validators.required],],
    })
  }

  saveForm() {
    this.saveButtonLoading = true;
    const data = {
      "id": this.id,
      "S_NombreCorto": this.formCorp.get('name').value,
      "S_NombreCompleto": this.formCorp.get('nameC').value,
      "S_LogoURL": this.formCorp.get('imageurl').value,
      "S_Activo": this.formCorp.get('status').value,
      "FK_Asignado_id": this.formCorp.get('asignate').value,
      "D_FechaIncorporacion": this.formatDate(this.formCorp.get('date').value )
    }
    this._userService.actCorporativo(data).subscribe((data) => {
      this.saveButtonLoading = false;
      console.log(data);
    },
      (err) => {
        this.saveButtonLoading = false;
        console.log(err);
      })
  }

  editContact(item){
    this.detailContact = item;
    this.formContact = this.fb.group({
      name: [this.detailContact.S_Nombre, [Validators.required],],
      position: [this.detailContact.S_Puesto, [Validators.required],],
      coment: [this.detailContact.S_Comentarios, [Validators.required],] || '',
      phone: [this.detailContact.N_TelefonoFijo, [Validators.required],],
      mobil: [this.detailContact.N_TelefonoMovil, [Validators.required],],
      email: [this.detailContact.S_Email, [Validators.required],],
      tw_corporativo_id: [this.detailContact.tw_corporativo_id, [Validators.required],],
    })

  }

  saveEditContact(){
    const data = {
      "id" : this.detailContact.id,
      "S_Nombre": this.formContact.get('name').value,
      "S_Puesto": this.formContact.get('position').value ,
      "S_Comentarios": this.formContact.get('coment').value,
      "N_TelefonoFijo":this.formContact.get('phone').value,
      "N_TelefonoMovil": this.formContact.get('mobil').value,
      "S_Email": this.formContact.get('email').value,
      "tw_corporativo_id": this.formContact.get('tw_corporativo_id').value
    }
    this._userService.updateContactById(data).subscribe((data) => {
      //console.log(data);
      this.getCop();
    })

  }

  saveContact(){
    const data = {
      "S_Nombre": this.formContact.get('name').value,
      "S_Puesto": this.formContact.get('position').value ,
      "S_Comentarios": this.formContact.get('coment').value,
      "N_TelefonoFijo":this.formContact.get('phone').value,
      "N_TelefonoMovil": this.formContact.get('mobil').value,
      "S_Email": this.formContact.get('email').value,
      "tw_corporativo_id": this.corp.id
    }
    this._userService.createContact(data).subscribe((data) => {
      //console.log(data);
      this.getCop();
      this.formContact.reset();
    })

  }

  deleteContac(id, i){
    this._userService.deleteContactById(id).subscribe((data) => {
      console.log(data);
      this.getCop();
    })
  }


 formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

  back(): void {
    this.location.back()
  }

}
