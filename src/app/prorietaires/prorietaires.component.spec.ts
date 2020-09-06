import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProrietairesComponent } from './prorietaires.component';

describe('ProrietairesComponent', () => {
  let component: ProrietairesComponent;
  let fixture: ComponentFixture<ProrietairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProrietairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProrietairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
