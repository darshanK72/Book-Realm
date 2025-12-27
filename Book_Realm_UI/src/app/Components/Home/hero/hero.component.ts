import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Splide from '@splidejs/splide';
import { Hero } from 'src/app/Models/hero';
import { AppState } from 'src/app/Store/app.state';
import { getHeroSections } from 'src/app/Store/home/home.actions';
import { selectHeroSectionById } from 'src/app/Store/home/home.selectors';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css'],
    standalone: false
})
export class HeroComponent implements OnInit {
  @Input() sectionId!: string;
  @Input() heroIds!: string[];

  heroData: Hero[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getHeroSections({
      payload: {
        sectionId: this.sectionId,
        heroIds: this.heroIds
      }
    }));

    this.store.select(selectHeroSectionById(this.sectionId)).subscribe(
      heroSection => {
        if (heroSection) {
          this.heroData = heroSection.heros;
        }
      }
    );
  }
}
