import { Component } from '@angular/core';

interface Employee {
  EmployeeId: number;
  EmployeeNumber: string;
  FirstName: string;
  LastName: string;
  Birthday: Date;
  Gender: string;
  Picture: string;
}

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent {
  employees: Employee[] = [
    { EmployeeId: 1, EmployeeNumber: 'EMP001', FirstName: 'John', LastName: 'Doe', Birthday: new Date('1990-01-01'), Gender: 'Male', Picture: 'url/to/picture' },
    // Add more sample data as needed
  ];

  selectedEmployee: Employee | null = null;
  editingEmployee: Employee | null = null;
  newEmployee: Employee = {
    EmployeeId: 0,
    EmployeeNumber: '',
    FirstName: '',
    LastName: '',
    Birthday: new Date(),
    Gender: '',
    Picture: ''
  };

  showDetail(employee: Employee): void {
    this.selectedEmployee = employee;
    this.editingEmployee = null; 
  }

  editEmployee(employee: Employee): void {
    this.editingEmployee = { ...employee };
    this.selectedEmployee = null; 
  }

  cancelEdit(): void {
    this.editingEmployee = null;
  }

  saveEdit(): void {
    const index = this.employees.findIndex(emp => emp.EmployeeId === this.editingEmployee?.EmployeeId);
    if (index !== -1) {
      this.employees[index] = { ...this.editingEmployee };
      this.editingEmployee = null;
    }
  }

  deleteEmployee(employee: Employee): void {
    const index = this.employees.findIndex(emp => emp.EmployeeId === employee.EmployeeId);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }

  addEmployee(): void {
    this.newEmployee.EmployeeId = this.generateUniqueId();
    this.employees.push({ ...this.newEmployee });
    this.newEmployee = {
      EmployeeId: 0,
      EmployeeNumber: '',
      FirstName: '',
      LastName: '',
      Birthday: new Date(),
      Gender: '',
      Picture: ''
    };
  }

  private generateUniqueId(): number {
    let maxId = 0;
    for (const employee of this.employees) {
      if (employee.EmployeeId > maxId) {
        maxId = employee.EmployeeId;
      }
    }
    return maxId + 1;
  }
}
