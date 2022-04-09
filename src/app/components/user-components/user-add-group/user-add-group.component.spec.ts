import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddGroupComponent } from './user-add-group.component';

describe('UserAddGroupComponent', () => {
  let component: UserAddGroupComponent;
  let fixture: ComponentFixture<UserAddGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
