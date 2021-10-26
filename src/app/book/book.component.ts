import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book.model';
import { NgForm } from '@angular/forms';
import {  FilterPipe } from "./filter";
 

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookService]
})
export class BookComponent implements OnInit {
  search:string="";
  books: Book[] = [];
  error = '';
  success = '';
  book: Book =  { id:0, name:'',AuthorName:'', price:0};
  loading = false;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    await this.getAllBooks();
    this.loading = false;
  }

  getAllBooks(): void {
    this.bookService.getAll().subscribe(
      (data: Book[]) => {
        console.log("successsss",data);
        this.books = data;
        this.success = 'successful retrieval of the list';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  async addBook(f: NgForm) {
    this.resetAlerts();
    this.bookService.add(this.book).subscribe(
      (res: Book) => {
        console.log("before",res)
        this.books.push(res)
        console.log("after",this.book)
        this.success = 'Created successfully';
        f.reset()
      },
      (err) => (this.error = err.message)
    );
    await this.refresh();
}

async updateBook(name: any,AuthorName:any, price: any, id: any) {
  this.resetAlerts();
console.log("namename", name.model, AuthorName.model, price.model)
  this.bookService
    .put({ name: name.model,AuthorName: AuthorName.model, price: price.model, id: +id })
    .subscribe(
      (res) => {
        this.success = 'Updated successfully';
      },
      (err) => (this.error = err)
    );
}
async deleteBook(id: number) {
  this.loading = true;
  this.resetAlerts();
  this.bookService.delete(id).subscribe(
    (res) => {
      this.books = this.books.filter(function (item) {
        return item['id'] && +item['id'] !== +id;
      });

      this.success = 'Deleted successfully';
    },
    (err) => (this.error = err)
  );
  await this.refresh();
}
resetAlerts() {
  this.error = '';
  this.success = '';
}

}
