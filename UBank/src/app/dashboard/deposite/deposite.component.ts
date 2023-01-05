import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent implements OnInit {
  frmAcno = ''
  username = ''
  balance = ''
  cardBalance = ''


  constructor( private router: Router) {

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
  
 
}
