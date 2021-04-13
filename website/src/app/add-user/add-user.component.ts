import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [DataService]
})
export class AddUserComponent implements OnInit {
  model!: NgbDateStruct;
  userForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, public data: DataService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
		this.userForm = this.fb.group({
      id: '',
      birthDate: '',
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      gender: ['', Validators.required ],
      created: ''
		});
	}
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
  private dateToString = (date: { year: any; month: any; day: any; }) => `${date.year}-${date.month}-${date.day}`; 

  onSubmit(value:any) {
    this.router.navigate(['/users']);
    this.submitted = true;
    if (value.birthDate) {
      value.birthDate = this.dateToString(value.birthDate);
    }
    var today = new Date();
    value.created = today.toISOString().substring(0, 10);
    if (this.userForm.valid) {
      this.data.addUser(value);
    }
  }
}