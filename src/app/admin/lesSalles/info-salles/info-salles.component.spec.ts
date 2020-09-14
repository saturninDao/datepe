import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSallesComponent } from './info-salles.component';

describe('InfoSallesComponent', () => {
  let component: InfoSallesComponent;
  let fixture: ComponentFixture<InfoSallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
