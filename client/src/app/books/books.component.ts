import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../_services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  bookList: any[] = [];
  bookService = inject(BooksService);
  account = inject(AccountService);
  param = inject(ActivatedRoute);
  router = inject(Router)
  page: any;
  searchText: string = "";


  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.param.paramMap.subscribe(params => {
      this.page = params.get('page');
    });

    this.bookList = this.bookService.getBooks(this.page).subscribe({
      next: (response: any) => {
        this.bookList = response;
      },
      error: (error: any) => console.log(error)
    });
  }

  bookDetails(id: number) {
    this.router.navigateByUrl('/bookDetails/' + id);
  }

  checkIn(id: number) {
    this.bookService.checkIn(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.bookList = response;
      },
      error: (error: any) => console.log(error)
    });
  }

  checkOut(id: number) {
    this.bookService.checkOut(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.bookList = response;
      },
      error: (error: any) => console.log(error)
    });

    this.reload();
  }

  next() {
    this.page++;
    this.router.navigateByUrl('/books/' + this.page);
    this.bookList = this.bookService.getBooks(this.page).subscribe({
      next: (response: any) => {
        console.log(response);
        this.bookList = response;
      },
      error: (error: any) => console.log(error)
    });
  }

  previous() {
    this.page--;
    this.router.navigateByUrl('/books/' + this.page);
    this.bookList = this.bookService.getBooks(this.page).subscribe({
      next: (response: any) => {
        console.log(response);
        this.bookList = response;
      },
      error: (error: any) => console.log(error)
    });
  }

  goToPage() {
    this.router.navigateByUrl('/books/' + this.page);
    this.bookList = this.bookService.getBooks(this.page).subscribe({
      next: (response: any) => {
        console.log(response);
        this.bookList = response;
      },
      error: (error: any) => console.log(error)
    });
  }

  search() {
    if (this.searchText == "") {
      this.reload();
    } else {
      console.log(this.searchText);
      this.bookService.search(this.searchText).subscribe({
        next: (response: any) => {
          console.log(response);
          this.bookList = response;
        },
        error: (error: any) => console.log(error)
      });
    }
  }

}
