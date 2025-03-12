import { TestBed } from "@angular/core/testing";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
  provideAnimations,
} from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { importProvidersFrom } from "@angular/core";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideAnimations(),
        importProvidersFrom(NoopAnimationsModule, BrowserAnimationsModule),
        // provideAnimationsAsync(),
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
