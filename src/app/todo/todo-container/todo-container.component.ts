import { AsyncPipe, JsonPipe } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { Observable } from "rxjs";
import { Todo, TodosService } from "../services/todos.service";
import {
  TodoAction,
  TodoListFormComponent,
  TodoToBe,
} from "../todo-list-form/todo-list-form.component";
import { TodoListComponent } from "../todo-list/todo-list.component";

@Component({
  selector: "app-todo-container",
  standalone: true,
  imports: [
    MatDividerModule,
    TodoListFormComponent,
    TodoListComponent,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: "./todo-container.component.html",
  styleUrl: "./todo-container.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoContainerComponent {
  readonly #todoService = inject(TodosService);
  protected editMode = signal<boolean>(false);
  protected todos$: Observable<Todo[]> = this.#todoService.todos;
  protected todos = toSignal(this.#todoService.todos, { initialValue: [] });
  protected todoForEdition = signal<Todo | undefined>(undefined);

  handleTodoEvent(event: { action: TodoAction; todo?: TodoToBe | Todo }) {
    console.log({ t: this.todos() });
    const actions: Record<TodoAction, () => void> = {
      edit: () => this.editTodo(event.todo!),
      delete: () => this.deleteTodo(event.todo!),
      save: () => this.saveTodo(event.todo!),
      complete: () => this.toggleTodoStatus(event.todo!),
      toggle: () => this.toggleTodoStatus(event.todo!),
      markAllDone: () => this.markAllAsDone(),
    };

    event.action && actions[event.action] && actions[event.action]();
  }

  saveTodo(todo: TodoToBe | Todo): void {
    this.#todoService.add(todo);
  }

  deleteTodo(todo: TodoToBe | Todo): void {
    "id" in todo && this.#todoService.remove(todo.id);
  }

  editTodo(todo: TodoToBe | Todo): void {
    "id" in todo && this.#todoService.edit(todo.id, todo);
    this.editMode.set(false);
    this.todoForEdition.set(undefined);
  }

  toggleTodoStatus(todo: TodoToBe | Todo): void {
    "id" in todo && this.#todoService.toggleStatus(todo.id);
  }

  markAllAsDone(): void {
    this.#todoService.markAllAsDone();
  }

  setTodoForEdition(todo: Todo | undefined) {
    this.editMode.set(true);
    this.todoForEdition.set(todo);
  }
}
