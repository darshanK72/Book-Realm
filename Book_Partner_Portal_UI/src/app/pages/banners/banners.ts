import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerService, Banner } from '../../services/banner.service';
import { BannerModal } from './components/banner-modal/banner-modal';
import { Pagination } from '../../components/pagination/pagination';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [CommonModule, BannerModal, Pagination],
  templateUrl: './banners.html'
})
export class Banners implements OnInit {
  banners: Banner[] = [];
  pagedBanners: Banner[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Pagination state
  pageSize: number = 8;
  currentPage: number = 1;
  totalItems: number = 0;

  // Modal state
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedBanner: Banner | null = null;

  constructor(
    private bannerService: BannerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBanners();
  }

  loadBanners() {
    this.loading = true;
    this.error = null;
    this.bannerService.getBanners()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (data) => {
          this.banners = data;
          this.totalItems = data.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Unable to synchronize banner data. Please verify your connection.';
          console.error(err);
        }
      });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedBanners = this.banners.slice(startIndex, endIndex);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.updatePagedData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getBadgeClass(type: string | undefined) {
    switch (type) {
      case 'SMALL': return 'bg-blue-50 text-blue-600 ring-1 ring-blue-200';
      case 'MEDIUM': return 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200';
      case 'LARGE': return 'bg-purple-50 text-purple-600 ring-1 ring-purple-200';
      case 'HERO': return 'bg-amber-50 text-amber-600 ring-1 ring-amber-200';
      default: return 'bg-slate-50 text-slate-600 ring-1 ring-slate-200';
    }
  }

  openCreateModal() {
    this.selectedBanner = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(banner: Banner) {
    this.selectedBanner = { ...banner };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleSaveBanner(savedBanner: Banner) {
    if (this.isEditMode) {
      this.banners = this.banners.map(b => b.id === savedBanner.id ? savedBanner : b);
    } else {
      this.banners = [savedBanner, ...this.banners];
    }
    this.totalItems = this.banners.length;
    this.updatePagedData();
    this.cdr.detectChanges();
  }

  deleteBanner(id: string) {
    if (confirm('Permanently delete this promotional banner? This action is irreversible.')) {
      this.bannerService.deleteBanner(id).subscribe({
        next: () => {
          this.banners = this.banners.filter(b => b.id !== id);
          this.totalItems = this.banners.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err) => {
          alert('Failed to delete: ' + err.message);
        }
      });
    }
  }
}
