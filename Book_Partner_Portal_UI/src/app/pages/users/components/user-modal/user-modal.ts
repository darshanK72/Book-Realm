import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../../../services/user.service';
import { CustomDropdown, DropdownOption } from '../../../../components/custom-dropdown/custom-dropdown';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomDropdown],
  template: `
    <div *ngIf="isOpen" 
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in"
      (click)="$event.target === modalContainer && close()" #modalContainer
    >
      <div class="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scale-in border border-white/20">
        <!-- Header -->
        <div class="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-800 tracking-tight">Access Control</h2>
              <p class="text-xs text-slate-500 font-medium">Manage user identity and privileges</p>
            </div>
          </div>
          <button (click)="close()" class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form (ngSubmit)="save()" class="p-8 space-y-6 overflow-y-auto custom-scrollbar bg-white">
          <div class="space-y-6">
            <!-- Identity Preview -->
            <div class="flex items-center gap-5 p-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] ring-4 ring-slate-50/30">
              <div class="h-16 w-16 rounded-2xl bg-white border-2 border-white shadow-sm overflow-hidden flex-shrink-0 relative group">
                 <img *ngIf="formData.profileImage" [src]="formData.profileImage" class="h-full w-full object-cover">
                 <div *ngIf="!formData.profileImage" class="h-full w-full flex items-center justify-center bg-indigo-50 text-indigo-500 font-black text-xl">
                    {{ formData.name ? formData.name.substring(0,2).toUpperCase() : '??' }}
                 </div>
              </div>
              <div class="flex-1">
                 <h3 class="font-black text-slate-800 tracking-tight">{{ formData.name || 'Anonymous Identity' }}</h3>
                 <p class="text-xs text-slate-400 font-mono tracking-tighter">{{ formData.email || 'system@core.identity' }}</p>
              </div>
              <div class="px-3 py-1 bg-white rounded-lg border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                 ACTIVE
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Preferred Identity (Name)</label>
              <input 
                [(ngModel)]="formData.name" 
                name="name" 
                type="text" 
                placeholder="Enter full legal name" 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800"
                required
              >
            </div>

            <app-custom-dropdown
              label="Privilege Tier (Roles)"
              [options]="roleOptions"
              [(value)]="formData.userRoles"
              [isMultiSelect]="true"
              placeholder="Assign access levels"
            ></app-custom-dropdown>

            <div>
               <label class="block text-sm font-bold text-slate-700 mb-2 ml-1 border-l-4 border-indigo-500 pl-3">Asset URI (Profile Image)</label>
               <input 
                [(ngModel)]="formData.profileImage" 
                name="profileImage" 
                type="text" 
                placeholder="https://identity.assets.io/..." 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-indigo-400 bg-slate-50/30 outline-none transition-all text-xs font-mono"
              >
            </div>
          </div>
        </form>

        <div class="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-4">
          <button 
            type="button" 
            (click)="close()" 
            class="px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
          >
            DISCARD
          </button>
          <button 
            (click)="save()"
            type="submit" 
            [disabled]="loading"
            class="px-10 py-3 bg-indigo-600 text-white rounded-[1.25rem] hover:bg-indigo-700 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/30 disabled:opacity-50 flex items-center gap-3 active:scale-95"
          >
            <div *ngIf="loading" class="h-4 w-4 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            {{ loading ? 'Synchronizing...' : 'Authorize Changes' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scale-in { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
    .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
    .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
  `]
})
export class UserModal {
  @Input() isOpen: boolean = false;
  @Input() set user(value: User | null) {
    if (value) {
      this.formData = { ...value, userRoles: [...(value.userRoles || [])] };
    }
  }
  @Output() onSave = new EventEmitter<User>();
  @Output() onClose = new EventEmitter<void>();

  formData: any = {
    name: '',
    email: '',
    userRoles: [],
    profileImage: ''
  };
  loading: boolean = false;

  roleOptions: DropdownOption[] = [
    { value: 'Admin', label: 'Administrator' },
    { value: 'Partner', label: 'Business Partner' },
    { value: 'Customer', label: 'Standard Customer' }
  ];

  constructor(private userService: UserService) {}

  close() {
    this.onClose.emit();
  }

  save() {
    this.loading = true;
    const observer = {
        next: (savedUser: User) => {
          this.onSave.emit(savedUser);
          this.loading = false;
          this.close();
        },
        error: (err: any) => {
          alert('Error updating user: ' + err.message);
          this.loading = false;
        }
    };
    this.userService.updateUser(this.formData.id, this.formData).subscribe(observer);
  }
}
