import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/assets/services/api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
  username = ''
  cAcno = ''
  balance = ''
  cardBalance = ''
  email = ''
  isLogout = false
  isDelete = false


  dltac = ''
  dmessage = ''
  errMessage = ''
  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      alert('Please login')
      this.router.navigateByUrl("")

    } else {
      if (localStorage.getItem("username")) {
        this.username = (localStorage.getItem("username")) || ""
        this.cAcno = (localStorage.getItem("cAcno")) || ""
        this.email = (localStorage.getItem("mail")) || ""
        // this.balance = (localStorage.getItem("blnce")) || ""
        // this.cardBalance = (localStorage.getItem("crdblnce")) || ""
        this.api.balance(this.cAcno).subscribe((result: any) => {
          this.balance = (localStorage.getItem("blnce")) || ""
          this.cardBalance = result.crntCrdtbalance


        })
      } else {
        alert('Login again')
      }
    }

  }
  // logout 
  logout() {
    localStorage.clear()
    // localStorage.removeItem('token')
    // localStorage.removeItem('cAcno')
    // localStorage.removeItem('username')
    this.isLogout = true
    setTimeout(() => {
      this.router.navigateByUrl("")
    }, 3000);
    // this.isLogout=false
  }
  // for delete page child confirmation
  confirmation() {
    this.dltac = this.cAcno
    this.isDelete = true
  }
  // event from child for popup
  cancel() {
    this.dltac = ''
    this.isDelete = false
  }

  // delete function api
  deleteAcn(event: any) { // value from child html
    // console.log(event)
    this.api.deleteAccount(event[0]).subscribe((result: any) => {
      alert(result.message)
      this.dmessage = result.message
      localStorage.clear()
      this.router.navigateByUrl("")
    },

      (result: any) => {
        this.errMessage = result.error.message
        alert(result.error.message)
        console.log(this.errMessage)
      })
  }

}

