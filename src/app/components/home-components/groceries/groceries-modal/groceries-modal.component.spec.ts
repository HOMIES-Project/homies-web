import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceriesModalComponent } from './groceries-modal.component';

describe('GroceriesModalComponent', () => {
  let component: GroceriesModalComponent;
  let fixture: ComponentFixture<GroceriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceriesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
