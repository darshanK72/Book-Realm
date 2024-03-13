import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBannersComponent } from './small-banners.component';

describe('SmallBannersComponent', () => {
  let component: SmallBannersComponent;
  let fixture: ComponentFixture<SmallBannersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallBannersComponent]
    });
    fixture = TestBed.createComponent(SmallBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
