import { TestBed } from "@angular/core/testing";

import { TestScheduler } from "rxjs/testing";
import { mockTodos, mockTodosToggle } from "./todo-mock";
import { TodosService } from "./todos.service";

describe("TodosService", () => {
  let service: TodosService;
  let scheduler: TestScheduler;

  Object.defineProperty(globalThis, "crypto", {
    value: {
      randomUUID: (arr: any) => "uuid",
    },
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosService);
  });

  scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should add a todo", () => {
    const mockTodo = {
      title: "Buy Groceries",
      description: "Milk, Bread, Butter, Eggs, Cheese",
    };

    const expectedTodo = { ...mockTodo, done: false, id: "uuid" };

    scheduler.run(({ cold, expectObservable }) => {
      service.add(mockTodo);

      expectObservable(service.todos).toBe("a", {
        a: [...mockTodos, expectedTodo],
      });
    });

    expect(service.todos);
  });

  it("should remove a todo", () => {
    const expectedTodos = [
      {
        id: "2",
        title: "Complete Project Report",
        description:
          "Finish the quarterly project report and email it to the manager",
        done: false,
      },
    ];

    service.remove("1");

    scheduler.run(({ cold, expectObservable }) => {
      expectObservable(service.todos).toBe("a", {
        a: expectedTodos,
      });
    });
  });

  it("should edit a todo", () => {
    const mockTodoToBeEdited = {
      title: "[Edit] Buy Groceries",
      description: "[Edit] Milk, Bread, Butter, Eggs, Cheese",
    };

    const expectedTodos = [
      mockTodos[1],
      { id: "1", done: false, ...mockTodoToBeEdited },
    ];

    service.edit("1", mockTodoToBeEdited);

    scheduler.run(({ cold, expectObservable }) => {
      expectObservable(service.todos).toBe("a", {
        a: expectedTodos,
      });
    });
  });

  it("should mark all todos as done", () => {
    const expectedTodos = mockTodos.map((todo) => ({ ...todo, done: true }));

    service.markAllAsDone();

    scheduler.run(({ cold, expectObservable }) => {
      expectObservable(service.todos).toBe("a", {
        a: expectedTodos,
      });
    });
  });

  it("toggle todo status", () => {
    service.toggleStatus("1");

    scheduler.run(({ cold, expectObservable }) => {
      expectObservable(service.todos).toBe("a", {
        a: mockTodosToggle,
      });
    });
  });
});
