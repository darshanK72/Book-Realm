import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreService, Genre } from '../../services/genre.service';
import { GenreModal } from './components/genre-modal/genre-modal';
import { Pagination } from '../../components/pagination/pagination';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, GenreModal, Pagination],
  templateUrl: './genres.html'
})
export class Genres implements OnInit {
  genres: Genre[] = [];
  pagedGenres: Genre[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Pagination state
  pageSize: number = 8;
  currentPage: number = 1;
  totalItems: number = 0;

  // Modal state
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedGenre: Genre | null = null;

  constructor(
    private genreService: GenreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres() {
    this.loading = true;
    this.error = null;
    this.genreService.getGenres()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (data) => {
          this.genres = data;
          this.totalItems = data.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Synchronization failure in genre definitions.';
          console.error(err);
        }
      });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedGenres = this.genres.slice(startIndex, endIndex);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.updatePagedData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCreateModal() {
    this.selectedGenre = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(genre: Genre) {
    this.selectedGenre = { ...genre };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleSaveGenre(savedGenre: Genre) {
    if (this.isEditMode) {
      this.genres = this.genres.map(g => g.id === savedGenre.id ? savedGenre : g);
    } else {
      this.genres = [savedGenre, ...this.genres];
    }
    this.totalItems = this.genres.length;
    this.updatePagedData();
    this.cdr.detectChanges();
  }

  deleteGenre(id: string) {
    if (confirm('Permanently decommission this genre? This will impact all associated assets.')) {
      this.genreService.deleteGenre(id).subscribe({
        next: () => {
          this.genres = this.genres.filter(g => g.id !== id);
          this.totalItems = this.genres.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err) => {
          alert('Decommissioning failed: ' + err.message);
        }
      });
    }
  }
}
