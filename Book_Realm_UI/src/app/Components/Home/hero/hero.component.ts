import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import Splide from '@splidejs/splide';
import { HomeSection } from 'src/app/Payloads/homeSection';
import { AppState } from 'src/app/Store/app.state';
import { selectHeroSection } from 'src/app/Store/home/home.selectors';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit,AfterViewInit {

  @Input()
  heroData!: any;

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  imagesLarge: string[] = [
    '../../../assets/img/banner0.webp',
    '../../../assets/img/banner1.webp',
    '../../../assets/img/banner2.webp',
  ];
  imagesSmall: string[] = [
    '../../../assets/img/banners0.webp',
    '../../../assets/img/banners1.webp',
    '../../../assets/img/banners2.webp',
  ];
}
