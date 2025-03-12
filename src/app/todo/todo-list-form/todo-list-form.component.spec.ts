import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoListFormComponent } from "./todo-list-form.component";
import { provideAnimations } from "@angular/platform-browser/animations";

describe("TodoListFormComponent", () => {
  let component: TodoListFormComponent;
  let fixture: ComponentFixture<TodoListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListFormComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
