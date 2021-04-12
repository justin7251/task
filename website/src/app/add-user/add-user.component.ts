import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, public data: DataService) {}
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

  onSubmit(value:any) {
    value.birthDate = '';
    this.data.addUser(value);
  }
}