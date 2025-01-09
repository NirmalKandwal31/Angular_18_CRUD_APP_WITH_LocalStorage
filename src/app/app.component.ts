import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee } from './models/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  employeeForm!: FormGroup;

  employeeObj: Employee = new Employee();
  employeeList: any = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('EmployeeData');
    if (oldData != null) {
      this.employeeList = JSON.parse(oldData);
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      email: new FormControl(this.employeeObj.email),
      contact: new FormControl(this.employeeObj.contact),
      address: new FormControl(this.employeeObj.address),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      pinCode: new FormControl(this.employeeObj.pinCode),
    });
  }

  onSave() {
    const oldData = localStorage.getItem('EmployeeData');
    if (oldData != null) {
      let parseData = JSON.parse(oldData);
      this.employeeForm.value.empId = parseData.length + 1;
      this.employeeList.push(this.employeeForm.value);
    } else {
      this.employeeList.push(this.employeeForm.value);
    }

    localStorage.setItem('EmployeeData', JSON.stringify(this.employeeList));
    this.reset();
  }

  editEmployeeData(item: any) {
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate() {
    const record = this.employeeList.find(
      (x: any) => x.empId == this.employeeForm.value.empId
    );
    if (record != undefined) {
      record.name = this.employeeForm.value.name;
      record.email = this.employeeForm.value.email;
      record.contact = this.employeeForm.value.contact;
    }
    localStorage.setItem('EmployeeData', JSON.stringify(this.employeeList));
    this.reset();
  }

  onDelete(empId: any) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this record?'
    );
    if (confirmDelete) {
      const index = this.employeeList.findIndex((x: any) => {
        x.empId == empId;
      });
      this.employeeList.splice(index, 1);
      localStorage.setItem('EmployeeData', JSON.stringify(this.employeeList));
    }
  }

  reset() {
    this.employeeObj = new Employee();
    this.createForm();
  }
}
