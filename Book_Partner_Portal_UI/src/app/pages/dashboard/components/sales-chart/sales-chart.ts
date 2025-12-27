import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-bold text-slate-800">Sales Overview</h2>
          <p class="text-sm text-slate-500">Monthly revenue growth</p>
        </div>
        <select class="text-sm border-none bg-slate-50 rounded-lg px-3 py-2 text-slate-600 focus:ring-2 focus:ring-indigo-500 transition-all outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div class="relative h-64 w-full">
        <!-- Simple SVG Chart -->
        <svg class="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
          <!-- Grids -->
          <g class="text-slate-100" stroke="currentColor" stroke-width="1">
            <line x1="0" y1="0" x2="800" y2="0" />
            <line x1="0" y1="50" x2="800" y2="50" />
            <line x1="0" y1="100" x2="800" y2="100" />
            <line x1="0" y1="150" x2="800" y2="150" />
            <line x1="0" y1="200" x2="800" y2="200" />
          </g>

          <!-- Gradient Area -->
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(79, 70, 229, 0.2)" />
              <stop offset="100%" stop-color="rgba(79, 70, 229, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M0,150 Q100,120 200,160 T400,100 T600,130 T800,40 V200 H0 Z"
            fill="url(#chartGradient)"
          />

          <!-- Line -->
          <path
            d="M0,150 Q100,120 200,160 T400,100 T600,130 T800,40"
            fill="none"
            stroke="#4f46e5"
            stroke-width="3"
            stroke-linecap="round"
            class="animate-draw"
          />

          <!-- Dots -->
          <circle cx="200" cy="160" r="4" fill="white" stroke="#4f46e5" stroke-width="2" />
          <circle cx="400" cy="100" r="4" fill="white" stroke="#4f46e5" stroke-width="2" />
          <circle cx="600" cy="130" r="4" fill="white" stroke="#4f46e5" stroke-width="2" />
          <circle cx="800" cy="40" r="4" fill="white" stroke="#4f46e5" stroke-width="2" />
        </svg>

        <!-- X-Axis Labels -->
        <div class="flex justify-between mt-4 text-xs text-slate-400 font-medium px-1">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-draw {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: draw 2s ease-out forwards;
    }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
  `]
})
export class SalesChart {}
