import { AfterViewInit, Component } from '@angular/core';
import Splide from '@splidejs/splide';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // new Splide('.splide', {
    //   type: 'loop',
    //   perPage: 1,
    //   keyboard: false,
    //   autoplay: true,
    //   interval: 1000,
    //   arrows: false,
    // });
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
