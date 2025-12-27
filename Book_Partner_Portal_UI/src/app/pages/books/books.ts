import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../../services/book.service';
import { BookModal } from './components/book-modal/book-modal';
import { Pagination } from '../../components/pagination/pagination';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookModal, Pagination],
  templateUrl: './books.html'
})
export class Books implements OnInit {
  books: Book[] = [];
  pagedBooks: Book[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Pagination state
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  // Modal state
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedBook: Book | null = null;

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.error = null;
    
    // Using a simplified local pagination for now as per service returning Book[]
    this.bookService.getBooks(0, 1000) 
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (response: Book[]) => {
          this.books = response;
          this.totalItems = response.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.error = 'Failed to synchronize catalog. Please verify your connection.';
          console.error(err);
        }
      });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedBooks = this.books.slice(startIndex, endIndex);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.updatePagedData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCreateModal() {
    this.selectedBook = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(book: Book) {
    this.selectedBook = { ...book };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleSaveBook(savedBook: Book) {
    if (this.isEditMode) {
      this.books = this.books.map(b => b.id === savedBook.id ? savedBook : b);
    } else {
      this.books = [savedBook, ...this.books];
    }
    this.totalItems = this.books.length;
    this.updatePagedData();
    this.cdr.detectChanges();
  }

  deleteBook(id: string) {
    if (confirm('Permanently remove this book from catalog?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(b => b.id !== id);
          this.totalItems = this.books.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          alert('Failed to delete book: ' + err.message);
        }
      });
    }
  }
}
