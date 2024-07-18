import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { BooksComponent } from './books/books.component';
import { RegistrationComponent } from './registration/registration.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { authGuard } from './_guard/auth.guard';
import { libraryGuard } from './_guard/library.guard';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'registration', component: RegistrationComponent},
    {path:'books/:page', component: BooksComponent, canActivate:[authGuard]},
    {path:'addBooks', component: AddBooksComponent, canActivate:[libraryGuard]},
    {path:'bookDetails/:id',component:BookDetailComponent, canActivate:[authGuard]},
    {path:'**', component: HomeComponent, pathMatch: 'full'}
];
