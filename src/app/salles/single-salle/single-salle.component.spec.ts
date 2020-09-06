import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSalleComponent } from './single-salle.component';

describe('SingleSalleComponent', () => {
  let component: SingleSalleComponent;
  let fixture: ComponentFixture<SingleSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
