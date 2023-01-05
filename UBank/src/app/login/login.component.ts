import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/assets/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // to display error message in html
  errMassege = ""
  logMassage = ""

  //login form validation
  loginForm = this.logForm.group({ // input validation
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    paswrd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })

  constructor(private logForm: FormBuilder, private api: ApiService, private router: Router) {
  }
  ngOnInit(): void {
   

  }
  login() {
    if (this.loginForm.valid) {
      let acno = this.loginForm.value.acno
      let password = this.loginForm.value.paswrd
      // api call for asycrns 
      this.api.login(acno, password).subscribe((result: any) => { //LOGIN SUCCESS alert massage from server response  2xx
        localStorage.setItem("username", result.username)
        localStorage.setItem("cAcno", result.cAcno)
        localStorage.setItem("token", result.token)  // token from backend 
        localStorage.setItem("blnce", result.balance)
        localStorage.setItem("crdblnce",result.cardBalance)
        localStorage.setItem("mail",result.email)
        
        this.logMassage = result.message
        setTimeout(() => {
          this.router.navigateByUrl('dashboard')
        }, 1800)
      },

        (result: any) => { // alert massage from server response  4xx
          this.errMassege = result.error.message
          //alert(result.error.message)
        })
    }
  }
}


