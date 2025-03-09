# Estrutura do .spec no front

````md magic-move

```ts 
describe('TodoContainerComponent', () => {
 
});
```

```ts 
describe('TodoContainerComponent', () => {
  let component: TodoContainerComponent;
  let fixture: ComponentFixture<TodoContainerComponent>;
});
```

```ts
describe('TodoContainerComponent', () => {
  let component: TodoContainerComponent;
  let fixture: ComponentFixture<TodoContainerComponent>;

  beforeEach(async () => {

  });
});
```


```ts
describe('TodoContainerComponent', () => {
  let component: TodoContainerComponent;
  let fixture: ComponentFixture<TodoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoContainerComponent],
      providers: [],
    }).compileComponents();
  });
});
```
```ts
// arquivo: s.js
function sum(a, b) {
  return a + b;
}

module.exports = soma;

// arquivo: soma.test.js
const soma = require('./soma');

describe('Testing sum function', () => {
  beforeEach(() => {
    console.log('')
  });
  
  it('should sum 2 + 3 and return 5', () => {
    expect(soma(2, 3)).toBe(5);
  });
});
```


```ts
describe('TodoContainerComponent', () => {
  let component: TodoContainerComponent;
  let fixture: ComponentFixture<TodoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoContainerComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
```



```ts
describe('TodoContainerComponent', () => {
  let component: TodoContainerComponent;
  let fixture: ComponentF ixture<TodoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoContainerComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```



````

<!--
Component fixture

- Is the instance of the tested componente inside TestBet

- Have access to DOM, cmp properties, methods and variables


- TestBed
Configures and initializes environment for unit testing and provides methods for creating components and services in unit tests.

- Testing libraries
Jest, Jasmine, Vitest, Playwrigth, Cypress
-->
