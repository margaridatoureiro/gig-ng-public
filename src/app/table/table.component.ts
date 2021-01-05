import { Component, Input } from '@angular/core';
import { PaymentDataService } from "../payment.data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

  @Input()
  paymentName = ""; paymentAmount ="";
  records = [];
  codeRecords : any;
  codeNotFound = false;

createPayment(event : any) : any{
  if (this.codeRecords == null) { this.codeNotFound = true };
  this.PaymentDataService.savePayment({"name" : this.paymentName, "amount" : this.paymentAmount + " euros", "code" : this.codeRecords.code, "grid" : this.codeRecords.grid});
  this.records = this.PaymentDataService.getPayments();
  event.preventDefault();
}

  constructor(private PaymentDataService: PaymentDataService) {
    this.PaymentDataService.getCodeDetails().subscribe(CodeInfo => {
      this.codeRecords = CodeInfo;
    });
    this.records = this.PaymentDataService.getPayments();
  }

}
