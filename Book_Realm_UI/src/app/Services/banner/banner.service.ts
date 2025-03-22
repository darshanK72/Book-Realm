import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from 'src/app/Models/banner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Get all banners
  getAllBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(`${this.baseUrl}/banners`);
  }

  // Get banner by ID
  getBannerById(id: string): Observable<Banner> {
    return this.http.get<Banner>(`${this.baseUrl}/banners/${id}`);
  }

  // Get banners by list of IDs
  getBannersByIds(bannerIds: string[]): Observable<Banner[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Banner[]>(`${this.baseUrl}/banners/byIds`, bannerIds, httpOptions);
  }

  // Create small banner
  createSmallBanner(banner: Banner): Observable<Banner> {
    return this.http.post<Banner>(`${this.baseUrl}/banners/small-banner`, banner);
  }

  // Create medium banner
  createMediumBanner(banner: Banner): Observable<Banner> {
    return this.http.post<Banner>(`${this.baseUrl}/banners/medium-banner`, banner);
  }

  // Create large banner
  createLargeBanner(banner: Banner): Observable<Banner> {
    return this.http.post<Banner>(`${this.baseUrl}/banners/large-banner`, banner);
  }

  // Update banner
  updateBanner(id: string, banner: Banner): Observable<Banner> {
    return this.http.put<Banner>(`${this.baseUrl}/banners/${id}`, banner);
  }

  // Delete banner
  deleteBanner(id: string): Observable<Banner> {
    return this.http.delete<Banner>(`${this.baseUrl}/banners/${id}`);
  }
}