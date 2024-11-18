import {
  ComponentFixture,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import {
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  // normally use ng-mocks (better approach) but using fake here to avoid importing the ng-mocks library just for this one test
  selector: 'app-contact-form',
  template: ``,
  standalone: true,
})
class MockedContactFormComponent {}

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    })
      .overrideComponent(AboutComponent, {
        remove: { imports: [ContactFormComponent] },
        add: { imports: [MockedContactFormComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a defer block in different states', async () => {
    // Retrieve the list of all defer block fixtures and get the first block.
    const deferBlockFixture = (await fixture.getDeferBlocks())[0];

    // Render loading state and verify the rendered output.
    // await deferBlockFixture.render(DeferBlockState.Loading);
    // expect(componentFixture.nativeElement.innerHTML).toContain('Loading');

    // Render the final state and verify the output.
    await deferBlockFixture.render(DeferBlockState.Complete);
    // expect(componentFixture.nativeElement.innerHTML).toContain('Defer block content');

    const counterEl = fixture.debugElement.query(
      By.directive(MockedContactFormComponent)
    );
    const form: ContactFormComponent = counterEl.componentInstance;

    expect(form).toBeTruthy();
  });
});
