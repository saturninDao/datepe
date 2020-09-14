import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUtilisateursComponent } from './info-utilisateurs.component';

describe('InfoUtilisateursComponent', () => {
  let component: InfoUtilisateursComponent;
  let fixture: ComponentFixture<InfoUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoUtilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
