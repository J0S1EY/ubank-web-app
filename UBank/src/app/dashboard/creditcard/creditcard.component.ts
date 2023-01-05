import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/assets/services/api.service';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {

  frmAcno = ''
  username = ''
  balance = ''
  cardBalance = ''

  creditForm = this.formbulid.group({


    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })
  constructor(private formbulid: FormBuilder, private api: ApiService, private router: Router) {

  }
  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      alert('Please login')
      this.router.navigateByUrl("")
    } else {
      // set data in local storage 
      if (localStorage.getItem("username")) {
        this.username = (localStorage.getItem("username")) || ""
        this.frmAcno = (localStorage.getItem("cAcno")) || ""
        this.balance = (localStorage.getItem("blnce")) || ""
        this.cardBalance = (localStorage.getItem("crdblnce")) || ""
      }
    }
  }
  creditTransfer() { // amount transaction
    if (this.creditForm.valid) {


      let amount = this.creditForm.value.amount
      let pswd = this.creditForm.value.pswd
      this.api.creditTransfer(amount, pswd, this.frmAcno).subscribe((result: any) => {
        // console.log(result.crntBalance)
        alert(result.message)
        setTimeout(() => {
          this.creditForm.reset()
        }, 1500)
        this.balance = result.crntbalance
        this.cardBalance = result.cardBalance
        localStorage.setItem("crdblnce", this.cardBalance)
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



