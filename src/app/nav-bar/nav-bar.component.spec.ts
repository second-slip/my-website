import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { BlogComponent } from '../blog/blog.component';
import { provideRouter, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;

  const routes = [
    { path: 'login', component: BlogComponent }
  ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [NavBarComponent]
      imports: [MatButtonModule, MatToolbarModule],
      providers: [provideExperimentalZonelessChangeDetection(),
      provideRouter(routes)
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(5);

    // icon button not displayed on small screens, so test 4 ?

    const firstButton = await loader.getHarness(MatButtonHarness); // === buttons[0]
  });

  it('render an active title button button', async () => {
    const titleButton = await loader.getHarness(MatButtonHarness.with({ selector: '.title-button' }));
    //expect(fixture.componentInstance.confirmed).toBe(false);
    expect(await titleButton.isDisabled()).toBe(false);
    expect(await titleButton.getText()).toBe('andrewstuartcross.co.uk');
    //await blogLink.click();
    //expect(fixture.componentInstance.confirmed).toBe(true);
  });

  it('should render an active Home button', async () => {
    const homeLink = await loader.getHarness(MatButtonHarness.with({ selector: '.about-btn' }));
    expect(await homeLink.isDisabled()).toBe(false);
  });

  it('should render an active Blog button', async () => {
    const blogLink = await loader.getHarness(MatButtonHarness.with({ selector: '.code-btn' }));
    expect(await blogLink.isDisabled()).toBe(false);
  });

  // it('should render an active About button', async () => {
  //   const aboutLink = await loader.getHarness(MatButtonHarness.with({ text: 'Miscellany' }));
  //   expect(await aboutLink.isDisabled()).toBe(false);
  // });

  it('should render an active GitHub icon button', async () => {
    const gitHubIconButton = await loader.getHarness(MatButtonHarness.with({ selector: '.github-icon-button' }));
    expect(await gitHubIconButton.isDisabled()).toBe(false);
  });
});