import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  
  isEditing:boolean = false;

  editAddress(){
    this.isEditing = true;
  }

  updateAddress(){
    this.isEditing = false;
  }
}
