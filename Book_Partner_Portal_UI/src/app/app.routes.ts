import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { HomeSections } from './pages/home-sections/home-sections';
import { Books } from './pages/books/books';
import { Banners } from './pages/banners/banners';
import { Heroes } from './pages/heroes/heroes';
import { Genres } from './pages/genres/genres';
import { Subgenres } from './pages/subgenres/subgenres';
import { Users } from './pages/users/users';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'home-sections', component: HomeSections },
            { path: 'books', component: Books },
            { path: 'banners', component: Banners },
            { path: 'heroes', component: Heroes },
            { path: 'genres', component: Genres },
            { path: 'subgenres', component: Subgenres },
            { path: 'users', component: Users }
        ]
    }
];
