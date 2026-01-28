import { Routes } from '@angular/router';
import { Main } from './components/landingpage/main/main';
import { Home } from './components/home/home';
import { Features } from './components/landingpage/features/features';
import { HowItWorks } from './components/landingpage/how-it-works/how-it-works';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { AuthGuard } from './guards/auth.guard';
import { DocsComponent } from './components/docs/docs.component';
import { Upload } from './components/upload/upload';


export const routes: Routes = [

    {
        path: '',
        component: Main
    },
    {
        path: 'home',
        component: Home,
        canActivate: [AuthGuard]
    },
    {
        path: 'features',
        component: Features
    },
    {
        path: 'how-it-works',
        component: HowItWorks
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'docs',
        component: DocsComponent
    },
    {
        path: 'upload',
        component: Upload
    }

];