import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUtilisateursComponent } from './delete-utilisateurs.component';

describe('DeleteUtilisateursComponent', () => {
  let component: DeleteUtilisateursComponent;
  let fixture: ComponentFixture<DeleteUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUtilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
