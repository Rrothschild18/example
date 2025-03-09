import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mockTodos } from "./todo-mock";

export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export type AddTodo = Omit<Todo, "id" | "done">;
export type EditTodo = Omit<Todo, "id" | "done">;

@Injectable({
  providedIn: "root",
})
export class TodosService {
  #todos = new BehaviorSubject<Todo[]>(mockTodos);

  constructor() {}

  get todos(): Observable<Todo[]> {
    return this.#todos.asObservable();
  }

  add(todo: AddTodo): void {
    this.#todos.next([
      ...this.#todos.getValue(),
      {
        ...todo,
        id: crypto.randomUUID(),
        done: false,
      },
    ]);
  }

  remove(id: string): void {
    const filteredTodos = this.#todos
      .getValue()
      .filter((todo) => todo.id !== id);

    this.#todos.next([...filteredTodos]);
  }

  edit(id: string, newTodo: EditTodo): void {
    const todo = this.#todoById(id);
    const filteredTodos = this.#todos
      .getValue()
      .filter((todo) => todo.id !== id);

    if (todo) {
      this.#todos.next([
        ...filteredTodos,
        {
          ...todo,
          ...newTodo,
        },
      ]);
    }
  }

  markAllAsDone(): void {
    const allDoneTodos = this.#todos
      .getValue()
      .map((todo) => ({ ...todo, done: true }));

    this.#todos.next([...allDoneTodos]);
  }

  filterByCriteria(criteria: Partial<Todo>): Observable<Todo[]> {
    // return this.todos.filter(
    //   (todo) =>
    //     (criteria.title ? todo.title.includes(criteria.title) : true) &&
    //     (criteria.description
    //       ? todo.description.includes(criteria.description)
    //       : true) &&
    //     (criteria.done !== undefined ? todo.done === criteria.done : true)
    // );
    return of([]);
  }

  toggleStatus(id: string) {
    const todo = this.#todoById(id);

    const newTodos = this.#todos
      .getValue()
      .reduce((acc: Todo[], curr: Todo) => {
        if (curr.id === id) {
          return [...acc, { ...curr, done: !curr.done }];
        }

        return [...acc, curr];
      }, []);

    if (todo) {
      this.#todos.next(newTodos);
    }
  }

  #todoById(id: string): Todo | undefined {
    return this.#todos.getValue().find((todo) => todo.id === id);
  }
}
