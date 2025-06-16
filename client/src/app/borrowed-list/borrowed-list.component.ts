import { Component, inject } from '@angular/core';
import { BooksService } from '../_services/books.service';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrowed-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './borrowed-list.component.html',
  styleUrl: './borrowed-list.component.css'
})
export class BorrowedListComponent {

  bookList: any[] = [];
  bookService = inject(BooksService);
  account = inject(AccountService);
  router = inject(Router);
  user: string = '';

  ngOnInit(): void {
    this.reload();
  }

  reload() {

    if (this.account.currentUser() != null) {
      const username = this.account.currentUser()!.username;

      this.bookList = this.bookService.getBorrowedBooks(username).subscribe({
        next: (response: any) => {
          this.bookList = response;
        },
        error: (error: any) => console.log(error)
      });
    }
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

    if(this.user==''){
      this.reload();
    }else{
      this.bookList = this.bookService.getBorrowedBooks(this.user).subscribe({
        next: (response: any) => {
          this.bookList = response;
        },
        error: (error: any) => console.log(error)
      });
    }
  }

  searchUser() {

    this.bookService.getBorrowedBooks(this.user).subscribe({
      next: (response: any) => {
        console.log(response);
        this.bookList = response;
      },
      error: (error: any) => console.log(error)
    });
  }

}
