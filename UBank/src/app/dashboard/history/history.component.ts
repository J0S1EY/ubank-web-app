import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/assets/services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {


  frmAcno = ''
  username = ''
  balance = ''
  cardBalance = ''
  transaction: any = []


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
        this.api.getTransaction(this.frmAcno).subscribe((result: any) => {
          this.transaction = result.transactionData
          console.log(this.transaction)
        },
          (result: any) => {
            alert(result.error.message) //alert massage from server response  4xx
          })
      }
    }
  }
  logout() {
    localStorage.clear()
    this.router.navigateByUrl('')
  }
}
