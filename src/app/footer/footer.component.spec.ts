import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render GitHub button', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(1);

    // icon button not displayed on small screens, so test 4 ?
    const firstButton = await loader.getHarness(MatButtonHarness); // === buttons[0]
  });

  it('should set the year property to current year', () => {
    // Arrange
    const year = new Date().getFullYear().toString();
    const expected = `\u00A9 ${year} Andrew Stuart Cross`;

    // Act or change
    fixture.detectChanges();
    
    // Assert
    expect(component.message).toEqual(expected);
  });
});
