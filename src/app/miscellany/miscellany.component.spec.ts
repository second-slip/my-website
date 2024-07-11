import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellanyComponent } from './miscellany.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('MiscellanyComponent', () => {
  let component: MiscellanyComponent;
  let fixture: ComponentFixture<MiscellanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiscellanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
