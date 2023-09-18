import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MatButtonHarness } from '@angular/material/button/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      { imports: [MatButtonModule, MatToolbarModule], 
        declarations: [MenuComponent]
      })
      .compileComponents();
    fixture = TestBed.createComponent(MenuComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should work', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(4);

    const firstButton = await loader.getHarness(MatButtonHarness); // === buttons[0]
  });
});
