import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeBannersComponent } from './large-banners.component';

describe('LargeBannersComponent', () => {
  let component: LargeBannersComponent;
  let fixture: ComponentFixture<LargeBannersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LargeBannersComponent]
    });
    fixture = TestBed.createComponent(LargeBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
