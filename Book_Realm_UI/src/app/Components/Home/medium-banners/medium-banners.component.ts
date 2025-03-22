import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Banner } from 'src/app/Models/banner';
import { AppState } from 'src/app/Store/app.state';
import { getMediumBannerSections } from 'src/app/Store/home/home.actions';
import { selectMediumBannerSectionById } from 'src/app/Store/home/home.selectors';

@Component({
  selector: 'app-medium-banners',
  templateUrl: './medium-banners.component.html',
  styleUrls: ['./medium-banners.component.css']
})
export class MediumBannersComponent implements OnInit {

  @Input()
  bannerIds!: string[];
  @Input()
  sectionId!: string;

  bannerData: Banner[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Dispatch action to load medium banner data
    this.store.dispatch(getMediumBannerSections({
      payload: {
        sectionId: this.sectionId,
        sectionName: 'MediumBanner',
        bannerIds: this.bannerIds
      }
    }));

    // Subscribe to the medium banner section data
    this.store.select(selectMediumBannerSectionById(this.sectionId)).subscribe(
      section => {
        if (section) {
          this.bannerData = section.mediumBanners;
        }
      }
    );
  }

}
