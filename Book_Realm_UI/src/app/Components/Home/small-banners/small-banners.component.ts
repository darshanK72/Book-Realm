import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Banner } from 'src/app/Models/banner';
import { AppState } from 'src/app/Store/app.state';
import { getSmallBannerSections } from 'src/app/Store/home/home.actions';
import { selectSmallBannerSectionById } from 'src/app/Store/home/home.selectors';

@Component({
  selector: 'app-small-banners',
  templateUrl: './small-banners.component.html',
  styleUrls: ['./small-banners.component.css']
})
export class SmallBannersComponent implements OnInit {
  @Input() bannerIds!: string[];
  @Input() sectionId!: string;

  bannerData: Banner[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Dispatch action to load small banner data
    this.store.dispatch(getSmallBannerSections({
      payload: {
        sectionId: this.sectionId,
        sectionName: 'SmallBanner',
        bannerIds: this.bannerIds
      }
    }));

    // Subscribe to the small banner section data
    this.store.select(selectSmallBannerSectionById(this.sectionId)).subscribe(
      section => {
        if (section) {
          this.bannerData = section.smallBanners;
        }
      }
    );
  }
}
