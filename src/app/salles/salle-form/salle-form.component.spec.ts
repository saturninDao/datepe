import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleFormComponent } from './salle-form.component';

describe('SalleFormComponent', () => {
  let component: SalleFormComponent;
  let fixture: ComponentFixture<SalleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
