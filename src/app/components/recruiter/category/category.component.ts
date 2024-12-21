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
  // categoryTypeypeValue: string = '';
  categories: Category[] = [];
  filteredCategories: Category[] = [];

  isCategoryNameFocused: boolean = false;
  categoryNameValue: string = '';

  isCategoryTypeFocused: boolean = false;
  categoryTypeValue: string = '';
  isEditMode: boolean = false; // To track if we are in edit mode
  categoryStatus: boolean = false;
  categoryId: number;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.fetchAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.filteredCategories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onOpenCategory() {
    document.getElementById('categoryModel')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll

  }
  onEditCategory(category: any) {
    console.log(category);
    this.categoryTypeValue = category.category_type; // Assuming the exact naming in the category object
    this.categoryNameValue = category.category_name; // Assuming the exact naming in the category object
    this.categoryId = category.category_id;
    this.isEditMode = true; // Set the mode to edit
    this.categoryStatus = category.status
    document.getElementById('categoryModel')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll

  }

  onCreateOrUpdateCategory(): void {
    const categoryData = {
      category_type: this.categoryTypeValue,
      category_name: this.categoryNameValue,
      status: this.categoryStatus ? 'active' : 'inactive' // exact status as either 'active' or 'inactive'
    };
    console.log(this.categoryId);

    // Log the status value
    console.log('Current category status:', this.categoryStatus ? 'Active' : 'Inactive');

    if (this.isEditMode) {
      // Update logic here (send a request to update the category)
      console.log('Updating category...', categoryData);
      // Call your update service method here
      this.categoryService.updateCategoryById(this.categoryId, categoryData).subscribe({
        next: (response) => {
            console.log('Category updated successfully:', response);
            this.loadCategories(); // Refresh categories list
            this.closeCategoryModal(); // Close modal after successful update
        },
        error: (error) => {
            console.error('Error updating category:', error);
        }
    });
    } else {
      // Create logic here (send a request to create a new category)
      console.log('Creating category...', categoryData);
      this.categoryService.createCategory(categoryData).subscribe({
        next: (response) => {
          console.log('Category created successfully:', response);
          this.loadCategories(); // Refresh categories list
          this.closeCategoryModal(); // Close modal
        },
        error: (error) => {
          console.error('Error creating category:', error);
        }
      });
    }
  }

  deleteCategoryById(id: number): void {
    this.categoryService.deleteCategoryById(id).subscribe({
        next: (response) => {
            console.log('Category deleted successfully:', response);
            this.loadCategories(); // Refresh the categories list
        },
        error: (error) => {
            console.error('Error deleting category:', error);
        }
    });
}

  onCreateCategory() {
    console.log(this.categoryTypeValue, this.categoryNameValue);
    const categoryData = {
      category_type: this.categoryTypeValue,
      category_name: this.categoryNameValue
    };

    this.categoryService.createCategory(categoryData).subscribe({
      next: (response) => {
        console.log('Category created successfully:', response);
        // Reload the categories or update the view as necessary
        this.loadCategories();
        // Optionally reset the input fields
        this.categoryTypeValue = '';
        this.categoryNameValue = '';
      },
      error: (error) => {
        console.error('Error creating category:', error);
      }
    });
  }
  closeCategoryModal() {
    this.categoryTypeValue = '';
    this.categoryNameValue = '';
    this.categoryId = null;
    document.getElementById('categoryModel')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll

  }
  onCategoryChange(event: any): void {
    const selectedDepartment = event.target.value;
    this.filterJobs(selectedDepartment);
  }
  filterJobs(selectedDepartment: string): void {
    if (selectedDepartment) {
      // Filter categories based on the selected type
      this.filteredCategories = this.categories.filter(category =>
        category.category_type === selectedDepartment
      );
    } else {
      // If no department is selected, reset to show all categories
      this.filteredCategories = [...this.categories];
    }
  }
  toggleStatus(): void {
    // Additional logic can be added here if needed
    console.log('Category status changed to:', this.categoryStatus ? 'Active' : 'Inactive');
  }

  onCategoryTypeChange(event: any): void {
    const selectedCategory = event.target.value;
    // this.filterJobs(selectedCategory);
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
