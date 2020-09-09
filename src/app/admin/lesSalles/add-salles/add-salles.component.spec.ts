import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSallesComponent } from './add-salles.component';

describe('AddSallesComponent', () => {
  let component: AddSallesComponent;
  let fixture: ComponentFixture<AddSallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
