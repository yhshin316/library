import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private http = inject(HttpClient);
  private account = inject(AccountService);
  baseUrl = 'https://localhost:5001/Book/';
  data:any={};

  getBooks(page:number): any {
    return this.http.get(`${this.baseUrl}SomeBooks/${page}`)
  }

  getRandomBooks(): any {
    return this.http.get(`${this.baseUrl}GetRandomBooks`)
  }

  checkOut(id:number) {
    this.data.username = this.account.currentUser()?.username;
    this.data.id = id;
    console.log(this.data);
    console.log(`${this.baseUrl}BorrowBook`,this.data);
    return this.http.put(`${this.baseUrl}BorrowBook`,this.data);
  }

  checkIn(id:number) {
    this.data.username = 'username';
    this.data.id = id;
    return this.http.put(this.baseUrl+'Return', this.data)
  }

  search(input:string){
    var url = `${this.baseUrl}titleSearch/${input}`;
    console.log(url);
    return this.http.get(`${this.baseUrl}titleSearch/${input}`)
  }
}
