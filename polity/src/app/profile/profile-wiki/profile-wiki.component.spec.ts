import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWikiComponent } from './profile-wiki.component';

describe('ProfileWikiComponent', () => {
  let component: ProfileWikiComponent;
  let fixture: ComponentFixture<ProfileWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileWikiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
