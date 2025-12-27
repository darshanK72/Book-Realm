import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService, Hero } from '../../services/hero.service';
import { HeroModal } from './components/hero-modal/hero-modal';
import { Pagination } from '../../components/pagination/pagination';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, HeroModal, Pagination],
  templateUrl: './heroes.html'
})
export class Heroes implements OnInit {
  heroes: Hero[] = [];
  pagedHeroes: Hero[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Pagination state
  pageSize: number = 5;
  currentPage: number = 1;
  totalItems: number = 0;

  // Modal state
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedHero: Hero | null = null;

  constructor(
    private heroService: HeroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes() {
    this.loading = true;
    this.error = null;
    this.heroService.getHeroes()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (data) => {
          this.heroes = data;
          this.totalItems = data.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Unable to synchronize hero data. Please verify your connection.';
          console.error(err);
        }
      });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedHeroes = this.heroes.slice(startIndex, endIndex);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.updatePagedData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCreateModal() {
    this.selectedHero = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(hero: Hero) {
    this.selectedHero = { ...hero };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleSaveHero(savedHero: Hero) {
    if (this.isEditMode) {
      this.heroes = this.heroes.map(h => h.id === savedHero.id ? savedHero : h);
    } else {
      this.heroes = [savedHero, ...this.heroes];
    }
    this.totalItems = this.heroes.length;
    this.updatePagedData();
    this.cdr.detectChanges();
  }

  deleteHero(id: string) {
    if (confirm('Permanently remove this hero section? This action cannot be undone.')) {
      this.heroService.deleteHero(id).subscribe({
        next: () => {
          this.heroes = this.heroes.filter(h => h.id !== id);
          this.totalItems = this.heroes.length;
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
