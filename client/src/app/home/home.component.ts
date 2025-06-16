import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../_services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  bookList: any[] = [];
  filteredList: any[] = [];
  bookService = inject(BooksService);
  param = inject(ActivatedRoute);
  router = inject(Router)
  accountService = inject(AccountService);
  page: any;
  filterOption: string = 'Title';
  sortOption: string = '';
  filterText: string = '';
  searchText: string = '';

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.param.paramMap.subscribe(params => {
      this.page = params.get('page');
    });

    this.bookList = this.bookService.getRandomBooks().subscribe({
      next: (response: any) => {
        console.log(response);
        this.bookList = response;
        this.filteredList = response;
      },
      error: (error: any) => console.log(error)
    });
  }

  bookDetails(id: number) {
    this.router.navigateByUrl('/bookDetails/' + id);
  }

  checkOut(id: number) {
    var check = this.bookService.checkOut(id);
    console.log(check);
    if (check != null) {
      check.subscribe({
        next: (response: any) => {
          console.log(response);
          this.bookList = response;
        },
        error: (error: any) => console.log(error)
      });
    } else {

    }
    this.reload();
  }

  filter() {
    console.log(this.filteredList);
    console.log(this.bookList);
    if (this.searchText == '' && this.filterOption != "Availability") {
      this.filteredList = this.bookList;
    } else if (this.filterOption == 'Title') {
      this.filteredList = this.bookList.filter(book =>
        book.title.toLowerCase().includes(this.searchText.toLowerCase())
      )
    } else if (this.filterOption == 'Author') {
      this.filteredList = this.bookList.filter(book =>
        book.author.toLowerCase().includes(this.searchText.toLowerCase())
      )
    } else if (this.filterOption == 'Availability') {
      this.filteredList = this.bookList.filter(book =>
        book.username == null)
    } else {
      this.filteredList = this.bookList;
    }
  }

  sort() {
    if (this.sortOption == '') {
      this.filteredList = this.bookList;
    } else if (this.sortOption == 'TitleAsc') {
      this.filteredList = this.filteredList.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      })
    } else if (this.sortOption == 'TitleDes') {
      this.filteredList = this.filteredList.sort((a, b) => {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      })
    } else if (this.sortOption == 'AuthorAsc') {
      this.filteredList = this.filteredList.sort((a, b) => {
        if (a.author < b.author) {
          return -1;
        }
        if (a.author > b.author) {
          return 1;
        }
        return 0;
      })
    } else if (this.sortOption == 'AuthorDes') {
      this.filteredList = this.filteredList.sort((a, b) => {
        if (a.author < b.author) {
          return 1;
        }
        if (a.author > b.author) {
          return -1;
        }
        return 0;
      })
    } else if (this.sortOption == 'AvailabilityAsc') {
      this.filteredList = this.filteredList.sort((a) => {
        if (a.username == null) {
          return -1;
        }
        if (a.author != null) {
          return 1;
        }
        return 0;
      })
    } else if (this.sortOption == 'AvailabilityDes') {
      this.filteredList = this.filteredList.sort((a) => {
        if (a.username == null) {
          return 1;
        }
        if (a.username != null) {
          return -1;
        }
        return 0;
      })
    } else {
    }
  }

}
