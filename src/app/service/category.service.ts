import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://127.0.0.1:5000/fetchAllCategories';
  private createUrl = 'http://127.0.0.1:5000/createCategories';
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  fetchAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  createCategory(categoryData: { category_type: string; category_name: string }): Observable<any> {
    return this.http.post<any>(this.createUrl, categoryData); 
  }

  updateCategoryById(id: number, data: any): Observable<any> {
    const url = `${this.baseUrl}/updateCategoryById/${id}`;
    return this.http.put(url, data);
  }

  deleteCategoryById(id: number): Observable<any> {
    const url = `${this.baseUrl}/deleteCategoryById/${id}`;
    return this.http.delete(url);
  }
}
