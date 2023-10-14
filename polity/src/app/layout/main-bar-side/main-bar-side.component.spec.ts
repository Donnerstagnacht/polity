import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBarSideComponent } from './main-bar-side.component';

describe('MainBarSideComponent', () => {
  let component: MainBarSideComponent;
  let fixture: ComponentFixture<MainBarSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBarSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBarSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
