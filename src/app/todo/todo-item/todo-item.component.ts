import { Component, input } from '@angular/core';
import { Todo } from '../services/todos.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todo = input.required<Todo>();
}