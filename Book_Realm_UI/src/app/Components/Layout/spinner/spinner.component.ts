import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';
import { selectIsLoading } from 'src/app/Store/shared/shared.selectors';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css'],
    standalone: false
})
export class SpinnerComponent implements OnInit{
  isLoading$!: Observable<boolean>;
  constructor(private ngxSpinnerService:NgxSpinnerService,private store:Store<AppState>){}
  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
  }
}
