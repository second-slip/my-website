import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { MiscellanyComponent } from './miscellany/miscellany.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'about', component: AboutComponent, pathMatch: 'full' },
    { path: 'code', component: BlogComponent, pathMatch: 'full' },
    { path: 'miscellany', component: MiscellanyComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];