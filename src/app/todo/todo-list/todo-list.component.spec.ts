import { ComponentFixture, TestBed, fakeAsync } from "@angular/core/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatCheckboxHarness } from "@angular/material/checkbox/testing";
import { TodoListComponent } from "./todo-list.component";
import { mockTodos, moreTodosInput } from "../services/todo-mock";
import { HarnessLoader } from "@angular/cdk/testing";

import { provideAnimations } from "@angular/platform-browser/animations";
import { BehaviorSubject, Observable } from "rxjs";
import { Todo, TodosService } from "../services/todos.service";
import { compileComponentFromMetadata } from "@angular/compiler";
import { By } from "@angular/platform-browser";

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("inputs and outputs", () => {
    it("should initialize with empty todos array if no input provided", () => {
      expect(component.todos()).toEqual([]);
    });

    it("should have todoEvent output", () => {
      expect(component.todoEvent).toBeDefined();
    });

    it("should have todoToEdit output", () => {
      expect(component.todoToEdit).toBeDefined();
    });
  });

  describe("state computation", () => {
    it("should compute state with todos signal", () => {
      const state = component.state();
      expect(state.todos).toBeDefined();
      expect(state.todos()).toEqual(component.todos());
    });
  });

  describe("toggleTodoStatus", () => {
    it("should emit toggle action with todo", () => {
      const todo = mockTodos[0];
      spyOn(component.todoEvent, "emit");

      component.toggleTodoStatus(todo);

      expect(component.todoEvent.emit).toHaveBeenCalledWith({
        action: "toggle",
        todo,
      });

      fixture.detectChanges();
    });

    it("should emit toggle action with todo and toggle its value", async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.componentRef.setInput("todos", mockTodos);

      const firstMockedTodo = await loader.getHarness(
        MatCheckboxHarness.with({ selector: "#todo-1" }),
      );

      const initialCheckedState = await firstMockedTodo.isChecked();

      expect(initialCheckedState).toBeFalse();

      const toggleSpy = spyOn(component.todoEvent, "emit");

      await firstMockedTodo.toggle();

      const updatedCheckedState = await firstMockedTodo.isChecked();

      expect(updatedCheckedState).toBeTrue();

      expect(toggleSpy).toHaveBeenCalledWith({
        action: "toggle",
        todo: mockTodos[0],
      });
    });
  });

  describe("setTodoForEdition", () => {
    it("should emit todo through todoToEdit output", () => {
      const todo = mockTodos[0];
      spyOn(component.todoToEdit, "emit");

      component.setTodoForEdition(todo);

      expect(component.todoToEdit.emit).toHaveBeenCalledWith(todo);
    });
  });

  describe("deleteTodo", () => {
    it("should emit undefined through todoToEdit and delete action through todoEvent", () => {
      const todo = mockTodos[0];
      spyOn(component.todoToEdit, "emit");
      spyOn(component.todoEvent, "emit");

      component.deleteTodo(todo);

      expect(component.todoToEdit.emit).toHaveBeenCalledWith(undefined);
      expect(component.todoEvent.emit).toHaveBeenCalledWith({
        action: "delete",
        todo: todo,
      });
    });
  });

  describe("markAllAsDone", () => {
    it("should emit markAllDone action", () => {
      spyOn(component.todoEvent, "emit");

      component.markAllAsDone();

      expect(component.todoEvent.emit).toHaveBeenCalledWith({
        action: "markAllDone",
      });
    });

    it("should update checkboxes when todos input changes", async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      fixture.componentRef.setInput("todos", mockTodos);

      // Verify initial state
      let allCheckboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      expect(allCheckboxes.length).toBe(2);

      const initialStates = await Promise.all(
        allCheckboxes.map((cb) => cb.isChecked()),
      );

      initialStates.forEach((state) => {
        expect(state).toBeFalse();
      });

      // Update todos input
      const updatedTodos = mockTodos.map((todo) => ({ ...todo, done: true }));
      fixture.componentRef.setInput("todos", updatedTodos);

      // Verify updated state
      const updatedStates = await Promise.all(
        allCheckboxes.map((cb) => cb.isChecked()),
      );

      updatedStates.forEach((state) => {
        expect(state).toBeTrue();
      });
    });

    it("should update checkboxes when todos input changes 2", () => {
      fixture.componentRef.setInput("todos", mockTodos);

      expect(component.state().todos()).toEqual(mockTodos);

      fixture.componentRef.setInput("todos", moreTodosInput);
      expect(component.state().todos()).toEqual(moreTodosInput);
    });

    it("should render checkboxes title and descriptions", async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      fixture.componentRef.setInput("todos", mockTodos);

      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);

      expect(checkboxes.length).toBe(mockTodos.length);

      for (let i = 0; i < mockTodos.length; i++) {
        const checkbox = checkboxes[i];
        const todo = mockTodos[i];

        const labelText = await checkbox.getLabelText();

        expect(labelText).toContain(todo.title);
        expect(labelText).toContain(todo.description);

        const isChecked = await checkbox.isChecked();
        expect(isChecked).toBe(todo.done);
      }
    });
  });

  it("should update todos when input changes", () => {
    fixture.componentRef.setInput("todos", mockTodos);
    fixture.detectChanges();

    expect(component.todos()).toEqual(mockTodos);
    expect(component.state().todos()).toEqual(mockTodos);
  });
});
