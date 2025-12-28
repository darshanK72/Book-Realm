import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Banner {
  id: string;
  placeHolder: string;
  clickUrl: string;
  bannerType: string;
  bannerImage: string;
  order: number;
}

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = `${environment.baseUrl}/banners`;

  constructor(private http: HttpClient) {}

  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl);
  }

  getBanner(id: string): Observable<Banner> {
    return this.http.get<Banner>(`${this.apiUrl}/${id}`);
  }

  createSmallBanner(banner: Partial<Banner>): Observable<Banner> {
    return this.http.post<Banner>(`${this.apiUrl}/small-banner`, banner);
  }

  createMediumBanner(banner: Partial<Banner>): Observable<Banner> {
    return this.http.post<Banner>(`${this.apiUrl}/medium-banner`, banner);
  }

  createLargeBanner(banner: Partial<Banner>): Observable<Banner> {
    return this.http.post<Banner>(`${this.apiUrl}/large-banner`, banner);
  }

  updateBanner(id: string, banner: Banner): Observable<Banner> {
    return this.http.put<Banner>(`${this.apiUrl}/${id}`, banner);
  }

  deleteBanner(id: string): Observable<Banner> {
    return this.http.delete<Banner>(`${this.apiUrl}/${id}`);
  }
}
