import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { UserModal } from './components/user-modal/user-modal';
import { Pagination } from '../../components/pagination/pagination';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserModal, Pagination],
  templateUrl: './users.html'
})
export class Users implements OnInit {
  users: User[] = [];
  pagedUsers: User[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Pagination state
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  // Modal state
  isModalOpen: boolean = false;
  selectedUser: User | null = null;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = null;
    this.userService.getUsers()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (data) => {
          this.users = data;
          this.totalItems = data.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Identity synchronization failure. Access control services may be degraded.';
          console.error(err);
        }
      });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.updatePagedData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openEditModal(user: User) {
    this.selectedUser = { ...user };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleSaveUser(savedUser: User) {
    this.users = this.users.map(u => u.id === savedUser.id ? savedUser : u);
    this.updatePagedData();
    this.cdr.detectChanges();
  }

  deleteUser(id: string) {
    if (confirm('Permanently revoke access for this identity? This action is irreversible.')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          this.totalItems = this.users.length;
          this.updatePagedData();
          this.cdr.detectChanges();
        },
        error: (err) => {
          alert('Revocation failed: ' + err.message);
        }
      });
    }
  }

  getRoleBadgeClass(role: string) {
    switch (role) {
      case 'Admin': return 'bg-rose-50 text-rose-600 ring-rose-200';
      case 'Partner': return 'bg-amber-50 text-amber-600 ring-amber-200';
      default: return 'bg-indigo-50 text-indigo-600 ring-indigo-200';
    }
  }
}
