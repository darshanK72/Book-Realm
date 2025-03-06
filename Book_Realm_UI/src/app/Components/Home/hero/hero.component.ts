import {Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Splide from '@splidejs/splide';
import { AppState } from 'src/app/Store/app.state';
import { selectHeroSection } from 'src/app/Store/home/home.selectors';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  heroData!: any;

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.store.select(selectHeroSection).subscribe(data => {
      this.heroData = [];
    })
  }
}
