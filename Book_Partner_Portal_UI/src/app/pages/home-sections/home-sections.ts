import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService, HomeSection } from '../../services/home.service';
import { SectionModal } from './components/section-modal/section-modal';
import { Pagination } from '../../components/pagination/pagination';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home-sections',
  standalone: true,
  imports: [CommonModule, SectionModal, Pagination],
  templateUrl: './home-sections.html'
})
export class HomeSections implements OnInit {
  sections: HomeSection[] = [];
  pagedSections: HomeSection[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Pagination state
  pageSize: number = 8;
  currentPage: number = 1;
  totalItems: number = 0;

  // Modal state
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedSection: HomeSection | null = null;

  constructor(
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections() {
    this.loading = true;
    this.error = null;
    this.homeService.getAllSections()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (data: HomeSection[]) => {
          this.sections = data;
          this.totalItems = data.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.error = 'Structural synchronization failure. Home interface sequences may be unstable.';
          console.error(err);
        }
      });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedSections = this.sections.slice(startIndex, endIndex);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.updatePagedData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCreateModal() {
    this.selectedSection = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(section: HomeSection) {
    this.selectedSection = { ...section };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleSaveSection(savedSection: HomeSection) {
    if (this.isEditMode) {
      this.sections = this.sections.map(s => s.id === savedSection.id ? savedSection : s);
    } else {
      this.sections = [savedSection, ...this.sections];
    }
    this.totalItems = this.sections.length;
    this.updatePagedData();
    this.cdr.detectChanges();
  }

  deleteSection(id: string) {
    if (confirm('Permanently decommission this interface unit? This will alter the public storefront layout.')) {
      this.homeService.deleteSection(id).subscribe({
        next: () => {
          this.sections = this.sections.filter(s => s.id !== id);
          this.totalItems = this.sections.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          alert('Decommissioning failed: ' + err.message);
        }
      });
    }
  }

  getBadgeClass(type: string) {
    switch (type) {
      case 'Hero': return 'bg-indigo-50 text-indigo-600 ring-indigo-200';
      case 'Book': return 'bg-emerald-50 text-emerald-600 ring-emerald-200';
      case 'SmallBanner': return 'bg-amber-50 text-amber-600 ring-amber-200';
      default: return 'bg-slate-50 text-slate-600 ring-slate-200';
    }
  }
}
