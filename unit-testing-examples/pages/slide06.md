# Testes no TodoList  

````md magic-move
```ts {all}
// TodoListForm.ts
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
```

```ts
describe("inputs and outputs", () => {
  it("should emit toggle action with todo", () => {
    const todo = mockTodos[0];
    spyOn(component.todoEvent, "emit");

    component.toggleTodoStatus(todo);

    expect(component.todoEvent.emit).toHaveBeenCalledWith({
      action: "toggle",
      todo: todo,
    });

    fixture.detectChanges();
  });
});
```

```ts
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
```


```ts
it("should update checkboxes when todos input changes 2", () => {
  fixture.componentRef.setInput("todos", mockTodos);

  expect(component.state().todos()).toEqual(mockTodos);

  fixture.componentRef.setInput("todos", moreTodosInput);
  expect(component.state().todos()).toEqual(moreTodosInput);
});
```

```ts
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
```

````
