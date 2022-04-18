import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksModifyComponent } from './tasks-modify.component';

describe('TasksModifyComponent', () => {
  let component: TasksModifyComponent;
  let fixture: ComponentFixture<TasksModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
