import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/assets/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  registerForm = this.formbuld.group({
    username: ['', [Validators.required, Validators.pattern('[a-z A-Z 0-9]*')]],
    email: ['', [Validators.required, Validators.pattern('[a-z A-Z 0-9 @ . ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-z A-Z 0-9]*')]],

  })

  constructor(private formbuld: FormBuilder, private api: ApiService, private router: Router) {

  }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      let acno = this.registerForm.value.acno
      let password = this.registerForm.value.password
      let username = this.registerForm.value.username.toUpperCase()
      let email = this.registerForm.value.email
      // api call for asycrns 
      this.api.register(acno, password, username, email).subscribe((result: any) => { // alert massage from server response  2xx
        alert(result.message)
        this.router.navigateByUrl('')
        console.log(this.registerForm)
      },
        (result: any) => { // alert massage from server response  4xx
          alert(result.error.message)
         
        })
    }
  }
}


