import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { ApiService } from 'src/assets/services/api.service';

@Component({
  selector: 'app-sendmoney',
  templateUrl: './sendmoney.component.html',
  styleUrls: ['./sendmoney.component.css']
})
export class SendmoneyComponent implements OnInit {
  transferForm = this.formbulid.group({
    acnoname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })
  frmAcno = ''
  username = ''
  balance = ''

  constructor(private formbulid: FormBuilder, private api: ApiService, private router: Router) {

  }
  ngOnInit(): void { // set data in local storage 
    if (localStorage.getItem("username")) {
      if (localStorage.getItem("username")) {
        this.username = (localStorage.getItem("username")) || ""
        this.frmAcno = (localStorage.getItem("cAcno")) || ""
        this.balance = (localStorage.getItem("blnce")) || ""
      }
    }
  }

  transfer() {
    if (!localStorage.getItem("token")) {
      alert('Please login')
      this.router.navigateByUrl("")
    } else {
      // amount transaction
      if (this.transferForm.valid && this.transferForm.value.acno != this.frmAcno) {
        let acnoname = this.transferForm.value.acnoname.toLocaleUpperCase()
        let acno = this.transferForm.value.acno
        let amount = this.transferForm.value.amount
        let pswd = this.transferForm.value.pswd
        this.api.transfer(acnoname, acno, amount, pswd, this.frmAcno).subscribe((result: any) => {
          // console.log(result.crntBalance)
          alert(result.message)
          setTimeout(() => {
            this.transferForm.reset()
          }, 1500)
          this.balance = result.crntBalance
          localStorage.setItem("blnce", this.balance)
        },
          (result: any) => {
            alert(result.error.message) //alert massage from server response  4xx
          })

      } else {
        alert("can't transfer this account")
      }
    }
  }
  logout() {
    localStorage.clear()
    this.router.navigateByUrl('')

  }
}
