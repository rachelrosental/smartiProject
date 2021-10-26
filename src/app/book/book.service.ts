import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Book } from './book.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/books`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  add(book: Book) {
    let formData: FormData = new FormData();
    formData.append('name', book.name);
    formData.append('AuthorName', book.AuthorName);
    formData.append('price', book.price.toString());
    
    return this.http.post(`${this.baseUrl}/books`, formData ).pipe(
      map((res: any) => {
        return res;
      })
    );
}
put(book: Book) {
  console.log("putBook",)
  let x=book.id.toString()
  return this.http.put(`${this.baseUrl}/books/${book.id}`,book);
}

delete(id: any) {
  const params = new HttpParams()
    .set('id', id.toString());
console.log("id",id)
  return this.http.delete(`${this.baseUrl}/books/${id}`);
}
}
