import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBooksService } from '../_services/add-books.service';

@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css'
})
export class AddBooksComponent {
  bookForm = this.formBuilder.group({
    title: new FormControl<string | null>(null),
    author: new FormControl<string | null>(null),
    publisher: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
    isbn: new FormControl<string | null>(null),
    pageCount: new FormControl<number | null>(null),
    publication: new FormControl<Date | null>(null),
    description: new FormControl<string | null>(null),
  })
  AddBooksService = inject(AddBooksService);
  selectedFile: File | null = null;
  selectedFileData: any;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
  }

  onFileSelected(event: any) {
    console.log(event.target.files);
    this.selectedFile = event.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
        this.selectedFileData = reader.result?.toString().split(',')[1];

    };
  }

  addBook() {
    let command = {
      title: this.bookForm.get('title')?.value,
      author: this.bookForm.get('author')?.value,
      description: this.bookForm.get('description')?.value,
      publisher: this.bookForm.get('publisher')?.value,
      publication: this.bookForm.get('publication')?.value,
      category: this.bookForm.get('category')?.value,
      isbn: this.bookForm.get('isbn')?.value,
      pageCount: this.bookForm.get('pageCount')?.value,
      cover: this.selectedFileData
    }
    console.log(command);


    this.AddBooksService.addBook(command).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

}
