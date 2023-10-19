import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  isEditing:boolean = false;

  editProfile(){
    this.isEditing = true;
  }

  updateProfile(){
    this.isEditing = false;
  }
}
