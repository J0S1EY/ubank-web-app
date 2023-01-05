import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/assets/services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent {


  frmAcno = ''
  username = ''
  balance = ''
  cardBalance = ''
  transaction: any = []
  searchKey: string = ""


  constructor(private api: ApiService, private router: Router) {

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
  // seaech function
  search(event: any) {
    this.searchKey = event.target.value
  }
  // pdf genaration
  genaratepdf() {
    var pdf = new jspdf();
    let col = ['Date', 'Time', 'Type', 'Amount','Transferred to', 'Remarks']
    let row = []

    pdf.setFontSize(14);
    pdf.text('Transaction Statement', 14, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    // array of object to convert array of array
    var statement = this.transaction
    statement.forEach(element => {
      var tempAry = [element.date,element.time, element.type, element.amount,element.toacno,element.remark];
      row.push(tempAry);

    });

    (pdf as any).autoTable(col, row, { startY: 10 })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
  }

}



