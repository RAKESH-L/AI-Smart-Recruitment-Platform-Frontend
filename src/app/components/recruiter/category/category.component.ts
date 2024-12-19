import { Component } from '@angular/core';
import { CategoryService } from '../../../service/category.service';
import { Category } from '../../../model/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  isTypeFocused: boolean = false;
  TypeValue: string = '';
  searchQuery: string = '';
  categoryTypeypeValue: string = '';
  categories: Category[] = [];

  isCategoryNameFocused: boolean = false;
  categoryNameValue: string = '';

  isCategoryTypeFocused: boolean = false;
  categoryTypeValue: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.fetchAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onCreateCategory(){
    document.getElementById('categoryModel')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll

  }
  closeCategoryModal() {
    document.getElementById('categoryModel')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
  }
  onCategoryChange(event: any): void {
    const selectedDepartment = event.target.value;
    this.filterJobs(selectedDepartment, this.searchQuery);
  }
  filterJobs(selectedDepartment: string, searchQuery: string): void {
    
  }

  onCategoryTypeChange(event: any): void {
    
  }

  onTypeFocus() {
    this.isTypeFocused = true;

  }

  onTypeBlur() {
    if (!this.TypeValue) {
      this.isTypeFocused = false;
    }
  }

  onCategoryTypeFocus() {
    this.isCategoryTypeFocused = true;

  }

  onCategoryTypeBlur() {
    if (!this.categoryTypeValue) {
      this.isCategoryTypeFocused = false;
    }
  }
  
  onCategoryNameFocus() {
    this.isCategoryNameFocused = true;
    
  }

  onCategoryNameBlur() {
    if (!this.categoryNameValue) {
      this.isCategoryNameFocused = false;
    }
  }
}
