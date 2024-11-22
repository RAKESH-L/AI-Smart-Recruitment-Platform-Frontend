// employee.model.ts
export interface Employee {
  created_at: string;
  email: string; // Maps from employee_email
  employee_id: string; // Maps from employeeId
  full_name: string; // Maps from name
  password: string;
  phone_number: string;
  role: string; // Added new property
  updated_at: string; // Added new property
  username: string; // Added new property
}
  