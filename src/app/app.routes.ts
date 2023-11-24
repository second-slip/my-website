import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'about', component: AboutComponent, pathMatch: 'full' },
    { path: 'blog', component: BlogComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];