import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaymentDataService {

  defaultGrid = [];

  codeDetailsRecords : Subject<any> = new Subject();

  paymentRecords = [];

  isGridGeneratorDisabled : boolean = false;

  saveCodeDetails(codeInfo : any) : boolean {
    if (!codeInfo) return false;
    this.codeDetailsRecords.next(codeInfo);
    return true;
  }

  getCodeDetails() : Subject<any> {
    if (!this.codeDetailsRecords) return null;
    return this.codeDetailsRecords;
  }

  savePayment(payment : any) : boolean {
    if (!payment) return false;
    this.paymentRecords.push(payment);
    return true;
  } 

  getPayments() : any[] {
    if (this.paymentRecords.length < 1) return null;
    return this.paymentRecords;
  }

  saveGridState(gridState : boolean) : any {
    this.isGridGeneratorDisabled = gridState;
  } 


  getGridState() : boolean {
    return this.isGridGeneratorDisabled;
  }

  constructor()
  {
  }
}
