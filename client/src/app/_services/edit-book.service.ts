import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditBookService {

  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/Book/EditBook';
  deleteUrl = 'https://localhost:5001/Book/Delete';

  getBookDetails(id:number){
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  editBook(bookModel: any) {
    return this.http.put(this.baseUrl,bookModel)
  }

  deleteBook(id:number){
    return this.http.get(`${this.deleteUrl}/${id}`);
  }
}
