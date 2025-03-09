import {
  Component,
  Input,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { Todo } from "../services/todos.service";
import {
  TodoAction,
  TodoToBe,
} from "../todo-list-form/todo-list-form.component";

export type ToggleEvent = { event: "toggle" | "markAllDone"; todo?: Todo };

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSlideToggleModule,
  ],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent {
  todos = input<Todo[]>([]);
  todoEvent = output<{
    action: TodoAction;
    todo?: TodoToBe | Todo;
  }>();

  todoToEdit = output<Todo | undefined>();

  state = computed(() => {
    return {
      todos: signal(this.todos()),
    };
  });

  toggleTodoStatus(todo: Todo): void {
    this.todoEvent.emit({ action: "toggle", todo });
  }

  setTodoForEdition(todo: Todo): void {
    this.todoToEdit.emit(todo);
  }

  deleteTodo(todo: TodoToBe | Todo): void {
    this.todoToEdit.emit(undefined);
    this.todoEvent.emit({ action: "delete", todo });
  }

  markAllAsDone(): void {
    this.todoEvent.emit({ action: "markAllDone" });
  }
}
