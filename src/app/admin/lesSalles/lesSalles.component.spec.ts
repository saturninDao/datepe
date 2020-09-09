import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesSallesComponent } from './lesSalles.component';

describe('LesSallesComponent', () => {
  let component: LesSallesComponent;
  let fixture: ComponentFixture<LesSallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesSallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
