import { Todo } from "./todos.service";

export const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Buy Groceries",
    description: "Milk, Bread, Butter, Eggs, Cheese",
    done: false,
  },
  {
    id: "2",
    title: "Complete Project Report",
    description:
      "Finish the quarterly project report and email it to the manager",
    done: false,
  },
  // {
  //   id: '3',
  //   title: 'Schedule Doctor Appointment',
  //   description: "Call Dr. Smith's office and schedule a check-up appointment",
  //   done: true,
  // },
  // {
  //   id: '4',
  //   title: 'Workout',
  //   description: 'Go to the gym for a 1-hour session',
  //   done: false,
  // },
  // {
  //   id: '5',
  //   title: 'Read Book',
  //   description: 'Read at least 30 pages of the new novel',
  //   done: true,
  // },
];
export const mockTodosToggle: Todo[] = [
  {
    id: "1",
    title: "Buy Groceries",
    description: "Milk, Bread, Butter, Eggs, Cheese",
    done: true,
  },
  {
    id: "2",
    title: "Complete Project Report",
    description:
      "Finish the quarterly project report and email it to the manager",
    done: false,
  },
];

export const moreTodosInput: Todo[] = [
  {
    id: "3",
    title: "Schedule Doctor Appointment",
    description: "Call Dr. Smith's office and schedule a check-up appointment",
    done: true,
  },
  {
    id: "4",
    title: "Workout",
    description: "Go to the gym for a 1-hour session",
    done: false,
  },
  {
    id: "5",
    title: "Read Book",
    description: "Read at least 30 pages of the new novel",
    done: true,
  },
];
