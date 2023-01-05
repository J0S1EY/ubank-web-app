import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/assets/services/api.service';

@Component({
  selector: 'app-deleteac',
  templateUrl: './deleteac.component.html',
  styleUrls: ['./deleteac.component.css']
})
export class DeleteacComponent implements OnInit {
  frmAcno = ''
  username = ''
  balance = ''
  target = ""
  dpswd:any

  // data from perent html  and  import input ,import { Component, OnInit,Input } from '@angular/core'; 
  @Input() dltAcno: string | undefined
  // user defined event for parent
  @Output() onCancel = new EventEmitter()
  // delete acno usin chile html
  @Output() onDelete = new EventEmitter()


  deleteForm = this.formbulid.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


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

  deleteConfirm() { // delete confirmation
    if (!localStorage.getItem("token")) {
      alert('Please login')
      this.router.navigateByUrl("")
    } else {
      // form validation
      if (this.deleteForm.valid && this.deleteForm.value.acno == this.frmAcno) {

        let acno = this.deleteForm.value.acno

        this.dpswd = this.deleteForm.value.pswd
        this.target = "exampleModal" // confirm popup
       
      } else {
        alert("account details error ")
      }
    }
  }
  // pop up cancel button
  cancel() {
    // on cancel event here using emit()
    this.onCancel.emit()
  }
  deleteAcno() {  // delete account
    this.onDelete.emit([this.dltAcno,this.dpswd]) 
    this.onCancel.emit()
    

  }
}
