import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { Todo, TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todo-container',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoContainerComponent {
  protected form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  protected filterControl = new FormControl('');
  protected filterDone: boolean | undefined;

  protected todos$: Observable<Todo[]> = this.todoService.todos;
  protected isEditingTodo = signal(false);

  private currentEditingTodoId = signal<string | null>(null);

  constructor(private todoService: TodosService) {}

  addTodo(): void {
    const todoToBeAdded = {
      title: this.form.value.title!,
      description: this.form.value.description!,
    };

    if (!todoToBeAdded.title.length || !todoToBeAdded.description.length) {
      return;
    }

    this.todoService.add(todoToBeAdded);

    this.form.setValue({
      title: '',
      description: '',
    });
  }

  removeTodo(id: string): void {
    this.todoService.remove(id);
  }

  editTodo(): void {
    const todoToBeEdited = {
      title: this.form.value.title!,
      description: this.form.value.description!,
    };

    this.todoService.edit(this.currentEditingTodoId()!, todoToBeEdited);
    this.isEditingTodo.set(false);
    this.currentEditingTodoId.set(null);

    this.form.setValue({
      title: '',
      description: '',
    });
  }

  setTodoForEdition(todo: Todo) {
    this.currentEditingTodoId.set(todo.id);
    this.isEditingTodo.set(true);
    this.form.patchValue(todo);
  }

  markAllAsDone(): void {
    this.todoService.markAllAsDone();
  }

  toggleTodoStatus(id: string): void {
    this.todoService.toggleStatus(id);
  }

  filterTodos(): void {}
}
