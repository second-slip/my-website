import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MatButtonHarness } from '@angular/material/button/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogComponent } from '../blog/blog.component';

// let loader: HarnessLoader;

// describe('MenuComponent', () => {
//   let component: MenuComponent;
//   let fixture: ComponentFixture<MenuComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [MenuComponent]
//     });
//     fixture = TestBed.createComponent(MenuComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// import {HarnessLoader} from '@angular/cdk/testing';
// import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';



describe('my-component', () => {
  let fixture: ComponentFixture<MenuComponent>;
  let loader: HarnessLoader;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule(
      {
        imports: [MatButtonModule, MatToolbarModule, RouterTestingModule.withRoutes([
          { path: 'login', component: BlogComponent },
        ])],
        declarations: [MenuComponent],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MenuComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should work', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(5);

    // icon button not displayed on small screens, so test 4 ?

    const firstButton = await loader.getHarness(MatButtonHarness); // === buttons[0]
  });

  it('render an active title button button', async () => {
    const titleButton = await loader.getHarness(MatButtonHarness.with({selector: '.title-button'}));
    //expect(fixture.componentInstance.confirmed).toBe(false);
    expect(await titleButton.isDisabled()).toBe(false);
    expect(await titleButton.getText()).toBe('andrewstuartcross.co.uk');
    //await blogLink.click();
    //expect(fixture.componentInstance.confirmed).toBe(true);
  });

  it('should render an active Home button', async () => {
    const homeLink = await loader.getHarness(MatButtonHarness.with({ text: 'Home' }));
    expect(await homeLink.isDisabled()).toBe(false);
  });

  it('should render an active Blog button', async () => {
    const blogLink = await loader.getHarness(MatButtonHarness.with({ text: 'Blog' }));
    expect(await blogLink.isDisabled()).toBe(false);
  });

  it('should render an active About button', async () => {
    const aboutLink = await loader.getHarness(MatButtonHarness.with({ text: 'About' }));
    expect(await aboutLink.isDisabled()).toBe(false);
  });

  it('should render an active GitHub icon button', async () => {
    const gitHubIconButton = await loader.getHarness(MatButtonHarness.with({ selector: '.github-icon-button' }));
    expect(await gitHubIconButton.isDisabled()).toBe(false);
  });
});