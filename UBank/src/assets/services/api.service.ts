import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  headers: new HttpHeaders() // function over loading 
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userData = {}

  constructor(private http: HttpClient) { }

  //LOGIN API  
  login(acno: any, pswd: any) {
    const logData = {
      acno,
      pswd
    }
    // define destination url
    return this.http.post('http://localhost:3000/login', logData)
  }

  // REGISTER API 
  register(acno: any, password: any, username: any, email: any) {
    const registerData = {
      acno,
      username,
      password,
      email
    }
    return this.http.post('http://localhost:3000/register', registerData)

  }
  /////********* function to append in the token in the header request
  sendjwt() {
    const token = localStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('jwt', token)
      options.headers = headers
    }
    return options
  }
  /////*********

  // FUND TRANSFER API
  transfer(acnoname: any, acno: any, amount: any, pswd: any, frmAcno: any) {
    const transferData = {
      acnoname,
      acno,
      amount,
      pswd,
      frmAcno

    }
    console.log("transfer data" + transferData)
    return this.http.post('http://localhost:3000/sendmoney', transferData, this.sendjwt())
  }
  creditTransfer(amount: any, pswd: any, frmAcno: any) {
    const crdtTransfer = {
      amount,
      pswd,
      frmAcno
    }

    console.log("credit transfer data" + crdtTransfer)
    return this.http.post('http://localhost:3000/creditcard', crdtTransfer, this.sendjwt())
  }
  balance(acno: any) {
    const blncInfo = {
      acno
    }
    return this.http.post('http://localhost:3000/getbalance', blncInfo, this.sendjwt())
  }

  //Transaction History
  getTransaction(acno: any) {
    const transaction = {
      acno
    }
    return this.http.post('http://localhost:3000/gettransaction', transaction, this.sendjwt())
  }

  // delete account using params
  deleteAccount(acno: any ) {
    console.log(acno)

    return this.http.delete('http://localhost:3000/deleteacno/' + acno, this.sendjwt())

  }
}





