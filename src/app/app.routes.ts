import { Routes } from '@angular/router';
import { Main } from './components/landingpage/main/main';
import { Home } from './components/home/home';


export const routes: Routes = [
    {
        path: 'landingpage',
        component: Main
    },
    {
        path: 'home',
        component: Home
    }

];
