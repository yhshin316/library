import { Component, inject, OnInit } from '@angular/core';
import { EditBookService } from '../_services/edit-book.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{
  
  bookModel:any={};
  edit = inject(EditBookService);
  param = inject(ActivatedRoute);
  account = inject(AccountService);
  router = inject(Router);
  id:any;
  selectedFile: File | null = null;
  selectedFileData: any;

  ngOnInit(): void {
    this.param.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.bookModel = this.edit.getBookDetails(this.id).subscribe({
        next: response => {
          console.log(response);
          this.bookModel = response
        },
        error: error => console.log(error)
      });
    });
  }

  onFileSelected(event: any) {
    console.log(event.target.files);
    this.selectedFile = event.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
        this.selectedFileData = reader.result?.toString().split(',')[1];
        this.bookModel.cover=this.selectedFileData;
    };
  }

  editBook() {
    console.log(this.bookModel);
    this.edit.editBook(this.bookModel).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

  deleteBook(){
    this.edit.deleteBook(this.id).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    });
    this.router.navigateByUrl('/books');
  }
}
