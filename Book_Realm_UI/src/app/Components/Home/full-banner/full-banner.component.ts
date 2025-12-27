import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Banner } from 'src/app/Models/banner';
import { AppState } from 'src/app/Store/app.state';
import { getLargeBannerSections } from 'src/app/Store/home/home.actions';
import { selectLargeBannerSectionById } from 'src/app/Store/home/home.selectors';

@Component({
    selector: 'app-full-banner',
    templateUrl: './full-banner.component.html',
    styleUrls: ['./full-banner.component.css'],
    standalone: false
})
export class FullBannerComponent implements OnInit {

    @Input()
    bannerIds!: string[];
    @Input()
    sectionId!: string;

    bannerData: Banner[] = [];

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        // Dispatch action to load large banner data
        this.store.dispatch(getLargeBannerSections({
            payload: {
                sectionId: this.sectionId,
                sectionName: 'LargeBanner',
                bannerIds: this.bannerIds
            }
        }));

        // Subscribe to the large banner section data
        this.store.select(selectLargeBannerSectionById(this.sectionId)).subscribe(
            section => {
                if (section) {
                    this.bannerData = section.largeBanners;
                }
            }
        );
    }

}
