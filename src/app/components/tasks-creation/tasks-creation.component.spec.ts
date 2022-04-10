import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCreationComponent } from './tasks-creation.component';

describe('TasksCreationComponent', () => {
  let component: TasksCreationComponent;
  let fixture: ComponentFixture<TasksCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
