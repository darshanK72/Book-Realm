import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  @Output()
  sidebarEmmiter = new EventEmitter<boolean>();
}
