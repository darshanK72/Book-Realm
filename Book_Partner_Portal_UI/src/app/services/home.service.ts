import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HomeSection {
  id: string;
  sectionName: string;
  sectionType: string;
  books: string[];
  banners: string[];
  heros: string[];
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:5239/api/home'; // Updated to correct port

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<HomeSection[]> {
    return this.http.get<HomeSection[]>(this.apiUrl);
  }

  getSectionById(id: string): Observable<HomeSection> {
    return this.http.get<HomeSection>(`${this.apiUrl}/${id}`);
  }

  createBookSection(data: Partial<HomeSection>): Observable<HomeSection> {
    return this.http.post<HomeSection>(`${this.apiUrl}/book-section`, data);
  }

  createHeroSection(data: Partial<HomeSection>): Observable<HomeSection> {
    return this.http.post<HomeSection>(`${this.apiUrl}/hero-section`, data);
  }

  createSmallBannerSection(data: Partial<HomeSection>): Observable<HomeSection> {
    return this.http.post<HomeSection>(`${this.apiUrl}/small-banner-section`, data);
  }

  createMediumBannerSection(data: Partial<HomeSection>): Observable<HomeSection> {
    return this.http.post<HomeSection>(`${this.apiUrl}/medium-banner-section`, data);
  }

  createLargeBannerSection(data: Partial<HomeSection>): Observable<HomeSection> {
    return this.http.post<HomeSection>(`${this.apiUrl}/large-banner-section`, data);
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateSection(id: string, data: Partial<HomeSection>): Observable<HomeSection> {
    return this.http.put<HomeSection>(`${this.apiUrl}/${id}`, data);
  }

  // Item Fetchers
  fetchAvailableBooks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5239/api/books');
  }

  fetchAvailableBanners(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5239/api/banners');
  }

  fetchAvailableHeros(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5239/api/heros');
  }
}
