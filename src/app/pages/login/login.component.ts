import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    passwd: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      alert(this.form.get<string>('email')?.value);
      alert(this.form.get<string>('passwd')?.value);
    }
  }
}
