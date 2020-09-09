import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUtilisateursComponent } from './edit-utilisateurs.component';

describe('EditUtilisateursComponent', () => {
  let component: EditUtilisateursComponent;
  let fixture: ComponentFixture<EditUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUtilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
