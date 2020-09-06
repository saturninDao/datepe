import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProprietaireComponent } from './single-proprietaire.component';

describe('SingleProprietaireComponent', () => {
  let component: SingleProprietaireComponent;
  let fixture: ComponentFixture<SingleProprietaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleProprietaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
