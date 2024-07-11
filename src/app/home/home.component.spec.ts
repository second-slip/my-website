import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component'
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { BlogComponent } from '../blog/blog.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const routes = [
    { path: 'login', component: BlogComponent }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection(),
      provideRouter(routes)]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
