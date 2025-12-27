import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: string;
  title: string;
  rating: number;
  description: string;
  publishDate: string;
  price: number;
  discountPercentage: number;
  pages: number;
  bookFormat: string;
  language: string;
  country: string;
  authorName: string;
  genreId: string;
  subgenreId: string;
  authorId: string;
  publisherName: string;
  publisherId: string;
  tags: string[];
  reviews: string[];
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5239/api/books';

  constructor(private http: HttpClient) {}

  getBooks(pageNumber: number = 0, pageSize: number = 10): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<Book> {
    return this.http.delete<Book>(`${this.apiUrl}/${id}`);
  }

  // Fetch helpers for BookModal
  getGenres(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5239/api/genres');
  }

  getSubgenres(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5239/api/subgenres');
  }

  // Authors and Publishers might be fetched from generic user/publisher endpoints if they existed
  // For now, we'll implement these as placeholders or fetch all books and extract unique names if no other way
  // Actually, let's check if there are specific Author repositories/controllers again.
}
