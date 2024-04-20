import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { AppState } from 'src/app/Store/app.state';
import { getHeroSections } from 'src/app/Store/home/home.actions';
import { selectHeroSection } from 'src/app/Store/home/home.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  sections!:any;

  constructor(
    private scrollService: ScrollService,
    private store: Store<AppState>
  ) {
    this.store.select(selectHeroSection).subscribe((data:any) => {
      this.sections = data?.sections;
      console.log(data);
      if (data?.heros) {
        this.store.dispatch(getHeroSections({ payload: data.heros }));
      }
    });
  }

  ngOnInit(): void {
    
  }
}
