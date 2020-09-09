import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSallesComponent } from './delete-salles.component';

describe('DeleteSallesComponent', () => {
  let component: DeleteSallesComponent;
  let fixture: ComponentFixture<DeleteSallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
