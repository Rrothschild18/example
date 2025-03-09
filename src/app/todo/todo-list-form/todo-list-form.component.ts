import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";
import { Todo } from "../services/todos.service";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

export type TodoAction =
  | "save"
  | "edit"
  | "delete"
  | "complete"
  | "toggle"
  | "markAllDone";
export type TodoToBe = Omit<Todo, "id" | "done">;

@Component({
  selector: "app-todo-list-form",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: "./todo-list-form.component.html",
  styleUrl: "./todo-list-form.component.scss",
})
export class TodoListFormComponent {
  todo = input<Todo | null>();
  isEditingTodo = input<boolean>(false);

  protected state = computed(() => ({
    isEditingTodo: signal(this.isEditingTodo()),
    form: new FormGroup({
      title: new FormControl("", { nonNullable: true }),
      description: new FormControl("", { nonNullable: true }),
    }),
    todo: signal(this.todo()),
  }));

  protected isCreateTodoMode = computed(() => !this.state().isEditingTodo());
  protected isEditingTodoMode = computed(() => this.state().isEditingTodo());

  protected todoEvent = output<{
    action: TodoAction;
    todo: TodoToBe;
  }>();

  constructor() {
    effect(() => {
      if (this.todo()) {
        this.state().form.setValue({
          title: this.state().todo()?.title! || "",
          description: this.state().todo()?.description! || "",
        });
      }
    });
  }

  addTodo(): void {
    const todoToBeSaved: TodoToBe = {
      title: this.state().form.value.title!,
      description: this.state().form.value.description!,
    };

    if (!todoToBeSaved.title.length || !todoToBeSaved.description.length) {
      return;
    }

    this.todoEvent.emit({ action: "save", todo: todoToBeSaved });

    this.state().form.setValue({
      title: "",
      description: "",
    });
  }

  editTodo(): void {
    const { title = "", description = "" } = this.state().form.value;

    const todoToBeEdited = {
      title,
      description,
      id: this.state().todo()?.id!,
      done: this.state().todo()?.done!,
    };

    this.todoEvent.emit({ action: "edit", todo: todoToBeEdited });

    this.state().form.setValue({
      title: "",
      description: "",
    });

    this.state().isEditingTodo.set(false);
  }
}
