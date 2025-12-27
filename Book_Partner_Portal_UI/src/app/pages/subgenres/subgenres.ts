import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubgenreService, Subgenre } from '../../services/subgenre.service';
import { SubgenreModal } from './components/subgenre-modal/subgenre-modal';
import { Pagination } from '../../components/pagination/pagination';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-subgenres',
  standalone: true,
  imports: [CommonModule, SubgenreModal, Pagination],
  templateUrl: './subgenres.html'
})
export class Subgenres implements OnInit {
  subgenres: Subgenre[] = [];
  pagedSubgenres: Subgenre[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Pagination state
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  // Modal state
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedSubgenre: Subgenre | null = null;

  constructor(
    private subgenreService: SubgenreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSubgenres();
  }

  loadSubgenres() {
    this.loading = true;
    this.error = null;
    this.subgenreService.getSubgenres()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (data) => {
          this.subgenres = data;
          this.totalItems = data.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Synchronization failure in nomenclature services.';
          console.error(err);
        }
      });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedSubgenres = this.subgenres.slice(startIndex, endIndex);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.updatePagedData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCreateModal() {
    this.selectedSubgenre = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(subgenre: Subgenre) {
    this.selectedSubgenre = { ...subgenre };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleSaveSubgenre(savedSubgenre: Subgenre) {
    if (this.isEditMode) {
      this.subgenres = this.subgenres.map(s => s.id === savedSubgenre.id ? savedSubgenre : s);
    } else {
      this.subgenres = [savedSubgenre, ...this.subgenres];
    }
    this.totalItems = this.subgenres.length;
    this.updatePagedData();
    this.cdr.detectChanges();
  }

  deleteSubgenre(id: string) {
    if (confirm('Permanently decommission this sub-classification?')) {
      this.subgenreService.deleteSubgenre(id).subscribe({
        next: () => {
          this.subgenres = this.subgenres.filter(s => s.id !== id);
          this.totalItems = this.subgenres.length;
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
