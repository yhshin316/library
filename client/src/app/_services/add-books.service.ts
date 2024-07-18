import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddBooksService {

  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/Book/AddBook';

  addBook(bookModel: any) {
    return this.http.post(this.baseUrl,bookModel)
  }
}
