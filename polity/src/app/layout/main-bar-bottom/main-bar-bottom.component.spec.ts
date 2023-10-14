import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBarBottomComponent } from './main-bar-bottom.component';

describe('MainBarBottomComponent', () => {
  let component: MainBarBottomComponent;
  let fixture: ComponentFixture<MainBarBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBarBottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBarBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
